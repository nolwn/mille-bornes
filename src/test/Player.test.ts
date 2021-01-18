import { expect } from "chai";
import Player from "../Player";
import { CardArea, CardKind } from "../Card";
import { TestActionCard } from "./TestCard";

describe("Player", () => {
	let player: Player;

	beforeEach(() => {
		player = new Player();
	});

	it("should list cards", () => {
		const { cards } = player;

		expect(cards.length).to.equal(0);
	});

	it("should draw", () => {
		const card = new TestActionCard(CardArea.Battle, CardKind.Hazard, true);
		player.draw(card);

		const { cards } = player;
		expect(cards.length).to.equal(1);
		expect(cards[0]).to.deep.equal(card);
	});

	it("should recieve cards onto the battle pile", () => {
		const hazardCard = new TestActionCard(
			CardArea.Battle,
			CardKind.Hazard,
			true
		);

		expect(player.battle).to.be.null;

		const result = player.recieve(hazardCard);

		expect(result).to.be.true;
		expect(player.battle?.area).to.equal(CardArea.Battle);
		expect(player.battle?.kind).to.equal(CardKind.Hazard);
	});

	it("should reject cards when the battle card returns false", () => {
		const restrictiveCard = new TestActionCard(
			CardArea.Battle,
			CardKind.Hazard,
			false
		);

		player.recieve(restrictiveCard);

		const nextCard = new TestActionCard(
			CardArea.Distance,
			CardKind.Distance,
			true
		);
		const result = player.recieve(nextCard);

		expect(result).to.be.false;
		expect(player.battle?.area).to.equal(CardArea.Battle);
		expect(player.battle?.kind).to.equal(CardKind.Hazard);
	});

	it("should recieve cards onto the speed pile", () => {
		const speedCard = new TestActionCard(CardArea.Speed, CardKind.Remedy, true);

		expect(player.speed).to.be.null;

		const result = player.recieve(speedCard);

		expect(result).to.be.true;
		expect(player.speed?.area).to.equal(CardArea.Speed);
		expect(player.speed?.kind).to.equal(CardKind.Remedy);
	});

	it("should reject cards when the speed card returns false", () => {
		const restrictiveCard = new TestActionCard(
			CardArea.Speed,
			CardKind.Hazard,
			false
		);

		player.recieve(restrictiveCard);

		const nextCard = new TestActionCard(
			CardArea.Distance,
			CardKind.Distance,
			true
		);
		const result = player.recieve(nextCard);

		expect(result).to.be.false;
		expect(player.speed?.area).to.equal(CardArea.Speed);
		expect(player.speed?.kind).to.equal(CardKind.Hazard);
	});

	it("should recieve cards onto the safety area", () => {
		let safetyCard = new TestActionCard(CardArea.Safety, CardKind.Safety, true);

		expect(player.safetyArea.length).to.equal(0);

		let result = player.recieve(safetyCard);

		expect(result).to.be.true;
		expect(player.safetyArea.length).to.equal(1);
		expect(player.safetyArea[0].kind).to.equal(CardKind.Safety);
		expect(player.safetyArea[0].area).to.equal(CardArea.Safety);

		safetyCard = new TestActionCard(CardArea.Safety, CardKind.Remedy, true);
		result = player.recieve(safetyCard);
		const [firstCard, secondCard] = player.safetyArea;

		expect(result).to.be.true;
		expect(player.safetyArea.length).to.equal(2);
		expect(firstCard.kind).to.equal(CardKind.Safety);
		expect(firstCard.area).to.equal(CardArea.Safety);
		expect(secondCard.kind).to.equal(CardKind.Remedy);
		expect(secondCard.area).to.equal(CardArea.Safety);
	});

	it("should reject cards if the safety area accepts it", () => {
		const permissiveCard = new TestActionCard(
			CardArea.Speed,
			CardKind.Remedy,
			true
		);

		const nextCard = new TestActionCard(CardArea.Speed, CardKind.Hazard, true);

		let result = player.recieve(permissiveCard);
		expect(result).to.be.true;
		expect(player.speed?.kind).to.equal(CardKind.Remedy);

		result = player.recieve(nextCard);
		expect(result).to.be.true;
		expect(player.speed?.kind).to.equal(CardKind.Hazard);
	});

	it("should reject cards if the safety area rejects it", () => {
		const restrictiveCard = new TestActionCard(
			CardArea.Speed,
			CardKind.Hazard,
			false
		);

		const nextCard = new TestActionCard(CardArea.Speed, CardKind.Remedy, true);

		let result = player.recieve(restrictiveCard);
		expect(result).to.be.true;
		expect(player.speed?.kind).to.equal(CardKind.Hazard);

		result = player.recieve(nextCard);
		expect(result).to.be.false;
		expect(player.speed?.kind).to.equal(CardKind.Hazard);
	});

	it("should not block cards when all safety area cards accept it", () => {
		const firstPermissiveCard = new TestActionCard(
			CardArea.Safety,
			CardKind.Safety,
			true
		);

		const secondPermissiveCard = new TestActionCard(
			CardArea.Safety,
			CardKind.Safety,
			true
		);

		const thirdPermissiveCard = new TestActionCard(
			CardArea.Safety,
			CardKind.Safety,
			true
		);

		let result = player.recieve(firstPermissiveCard);
		expect(result).to.be.true;

		result = player.recieve(secondPermissiveCard);
		expect(result).to.be.true;

		player.recieve(thirdPermissiveCard);
		expect(result).to.be.true;

		expect(player.safetyArea.length).to.equal(3);
	});

	it("should block cards when any safety area card returns false", () => {
		const firstPermissiveCard = new TestActionCard(
			CardArea.Safety,
			CardKind.Safety,
			true
		);

		const secondPermissiveCard = new TestActionCard(
			CardArea.Safety,
			CardKind.Safety,
			true
		);

		const firstRestrictiveCard = new TestActionCard(
			CardArea.Safety,
			CardKind.Safety,
			false
		);

		const thirdPermissiveCard = new TestActionCard(
			CardArea.Safety,
			CardKind.Safety,
			true
		);

		let result = player.recieve(firstPermissiveCard);
		expect(result).to.be.true;

		result = player.recieve(secondPermissiveCard);
		expect(result).to.be.true;

		result = player.recieve(firstRestrictiveCard);
		expect(result).to.be.true;

		result = player.recieve(thirdPermissiveCard);
		expect(result).to.be.false;

		expect(player.safetyArea.length).to.equal(3);
	});

	it("can recieve distance cards", () => {
		const distanceCard = new TestActionCard(
			CardArea.Distance,
			CardKind.Distance,
			true
		);
	});
});
