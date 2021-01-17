import { expect } from "chai";
import Player from "../Player";
import { CardArea, CardKind } from "../Card";
import TestCard from "./TestCard";

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
		const card = new TestCard(CardArea.Battle, CardKind.Hazard);
		player.draw(card);

		const { cards } = player;
		expect(cards.length).to.equal(1);
		expect(cards[0]).to.deep.equal(card);
	});

	it("should recieve cards onto the battle pile", () => {
		const hazardCard = new TestCard(CardArea.Battle, CardKind.Hazard);

		expect(player.battle).to.be.null;

		const result = player.recieve(hazardCard);

		expect(result).to.be.true;
		expect(player.battle?.area).to.equal(CardArea.Battle);
		expect(player.battle?.kind).to.equal(CardKind.Hazard);
	});

	it("should reject cards when the battle card returns false", () => {
		const restrictiveCard = new TestCard(CardArea.Battle, CardKind.Hazard);
		restrictiveCard.playRules = () => false;

		player.recieve(restrictiveCard);

		const nextCard = new TestCard(CardArea.Distance, CardKind.Distance);
		const result = player.recieve(nextCard);

		expect(result).to.be.false;
		expect(player.battle?.area).to.equal(CardArea.Battle);
		expect(player.battle?.kind).to.equal(CardKind.Hazard);
	});

	it("should recieve cards onto the speed pile", () => {
		const speedCard = new TestCard(CardArea.Speed, CardKind.Remedy);

		expect(player.speed).to.be.null;

		const result = player.recieve(speedCard);

		expect(result).to.be.true;
		expect(player.speed?.area).to.equal(CardArea.Speed);
		expect(player.speed?.kind).to.equal(CardKind.Remedy);
	});

	it("should reject cards when the speed card returns false", () => {
		const restrictiveCard = new TestCard(CardArea.Speed, CardKind.Hazard);
		restrictiveCard.playRules = () => false;

		player.recieve(restrictiveCard);

		const nextCard = new TestCard(CardArea.Distance, CardKind.Distance);
		const result = player.recieve(nextCard);

		expect(result).to.be.false;
		expect(player.speed?.area).to.equal(CardArea.Speed);
		expect(player.speed?.kind).to.equal(CardKind.Hazard);
	});
});
