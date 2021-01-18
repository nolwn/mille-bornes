import { expect } from "chai";
import { CardArea, CardKind } from "../Card";
import Player from "../Player";
import { TestActionCard } from "./TestCard";

describe("Cards", () => {
	let player: Player;
	let target: Player;

	beforeEach(() => {
		player = new Player();
		target = new Player();
	});

	it("creates a new card", () => {
		const card = new TestActionCard(CardArea.Battle, CardKind.Distance, true);
		const { area, kind } = card;

		expect(area).to.equal(CardArea.Battle);
		expect(kind).to.equal(CardKind.Distance);
	});

	// TODO: replace this with tests against actual cards
	it("runs rules against other cards", () => {
		const permissiveCard = new TestActionCard(
			CardArea.Battle,
			CardKind.Hazard,
			true
		);

		let result = permissiveCard.play(permissiveCard);
		expect(result).to.be.true;

		const restrictiveCard = new TestActionCard(
			CardArea.Battle,
			CardKind.Hazard,
			false
		);

		result = restrictiveCard.play(permissiveCard);
		expect(result).to.be.false;
	});
});
