import { expect } from "chai";
import { Card, CardArea, CardKind } from "../Card";
import Player from "../Player";
import TestCard from "./TestCard";

describe("Cards", () => {
	let player: Player;
	let target: Player;

	beforeEach(() => {
		player = new Player();
		target = new Player();
	});

	it("creates a new card", () => {
		const card = new TestCard(CardArea.Battle, CardKind.Distance);
		const { area, kind } = card;

		expect(area).to.equal(CardArea.Battle);
		expect(kind).to.equal(CardKind.Distance);
	});

	// TODO: replace this with tests against actual cards
	it("runs rules against other cards", () => {
		const card = new TestCard(CardArea.Battle, CardKind.Hazard);

		let playRules = () => true;
		card.playRules = playRules;

		let result = card.play(card);
		expect(result).to.be.true;

		playRules = () => false;
		card.playRules = playRules;

		result = card.play(card);
		expect(result).to.be.false;
	});
});
