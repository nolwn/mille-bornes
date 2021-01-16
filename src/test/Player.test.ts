import { expect } from "chai";
import Player from "../Player";
import { Card, CardArea, CardKind } from "../Card";
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

		player.recieve(hazardCard);

		expect(player.battle?.area).to.equal(CardArea.Battle);
		expect(player.battle?.kind).to.equal(CardKind.Hazard);
	});
});
