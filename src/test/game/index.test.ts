import { expect } from "chai";
import Game from "../../game";
import Player from "../../game/Player";

describe("Game", () => {
	let game: Game;

	beforeEach(() => {
		game = new Game();
	});

	it("reports whose turn it is", () => {
		const turn = game.turn;

		expect(turn).to.exist;
		expect(turn instanceof Player).to.be.true;
	});

	it("should list players", () => {
		const { players } = game;

		expect(Array.isArray(players)).to.be.true;
		expect(players.length).to.equal(0);
	});

	it("should add a new player", () => {
		const player: Player = new Player();
		game.addPlayer(player);

		const { players } = game;

		expect(players.length).to.equal(1);
		expect(players[0]).to.deep.equal(player);
	});
});
