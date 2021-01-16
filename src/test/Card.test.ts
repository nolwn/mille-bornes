import { expect } from "chai";
import { CardArea, CardKind } from "../Card";
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

	it("runs rules against other cards", () => {
		const card = new TestCard(CardArea.Battle, CardKind.Hazard);
	});
});
