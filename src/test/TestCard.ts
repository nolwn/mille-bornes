import { ActionCard, Card, CardArea, CardKind, DistanceCard } from "../Card";

export class TestActionCard extends ActionCard {
	#playRules: (card: Card) => boolean;

	constructor(area: CardArea, kind: CardKind, isPermissive: boolean) {
		super(area, kind);

		this.#playRules = () => isPermissive;
	}

	check(card: Card) {
		return this.#playRules(card);
	}
}

export class Test100Card extends DistanceCard {
	get distance(): number {
		return 100;
	}
}

export class Test50Card extends DistanceCard {
	get distance(): number {
		return 50;
	}
}
