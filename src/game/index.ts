import { Card } from "./Card";
import Player from "./Player";

export default class Game {
	#players: Player[];

	constructor() {
		this.#players = [];
	}

	get players(): Player[] {
		return this.#players;
	}

	get turn(): Player {
		return new Player();
	}

	addPlayer(player: Player): void {
		this.#players.push(player);
	}
}
