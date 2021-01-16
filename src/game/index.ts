import { Card } from "./Card";
import Player from "./Player";

export default class Game {
	#players: Player[];
	#battleCards: Card[];

	constructor() {
		this.#players = [];
		this.#battleCards = [];
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
