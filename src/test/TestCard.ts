import { ActionCard, Card, CardArea, CardKind } from "../Card";

export class TestActionCard extends ActionCard {
	#playRules: (card: Card) => boolean;

	constructor(area: CardArea, kind: CardKind, isPermissive: boolean) {
		super(area, kind);

		this.#playRules = () => isPermissive;
	}

	play(card: Card) {
		return this.#playRules(card);
	}
}

export class Test100MilleCard extends Card {}
