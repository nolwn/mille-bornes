export enum CardArea {
	Battle = "BATTLE",
	Speed = "SPEED",
	Safety = "SAFETY",
	Distance = "DISTANCE",
}

export enum CardKind {
	Hazard = "HAZARD",
	Remedy = "REMEDY",
	Safety = "SAFETY",
	Distance = "DISTANCE",
}

export abstract class Card {
	#area: CardArea;
	#kind: CardKind;

	constructor(area: CardArea, type: CardKind) {
		this.#area = area;
		this.#kind = type;
	}

	get area(): CardArea {
		return this.#area;
	}

	get kind(): CardKind {
		return this.#kind;
	}

	abstract play(card: Card): boolean;
}
