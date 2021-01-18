import { Card, CardArea, CardKind } from "../Card";

export default class TestCard extends Card {
	#playRules: (card: Card) => boolean;

	constructor(area: CardArea, kind: CardKind, isPermissive: boolean) {
		super(area, kind);

		this.#playRules = () => isPermissive;
	}

	play(card: Card) {
		return this.#playRules(card);
	}
}
