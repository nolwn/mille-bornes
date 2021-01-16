import { expect } from "chai";
import { Card, CardArea, CardKind } from "../../game/Card";
import Player from "../../game/Player";

describe("Cards", () => {
	let player: Player;
	let target: Player;

	beforeEach(() => {
		player = new Player();
		target = new Player();
	});

	it("creates a new card", () => {
		const card = new Card(CardArea.Battle, CardKind.Distance);
		const { area, kind } = card;

		expect(area).to.equal(CardArea.Battle);
		expect(kind).to.equal(CardKind.Distance);
	});
});
