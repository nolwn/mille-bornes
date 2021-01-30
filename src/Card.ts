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
}

export abstract class ActionCard extends Card {
	abstract check(card: Card): boolean;

	constructor(area: CardArea, kind: CardKind) {
		super(area, kind);
	}
}

export abstract class DistanceCard extends Card {
	abstract get distance(): number;
}

export class OutOfGas extends ActionCard {
	constructor() {
		super(CardArea.Battle, CardKind.Hazard);
	}

	check(card: Card): boolean {
		if (card.constructor.name === "Roll") {
			// roll is not allowed
			return false;
		} else if (card.constructor.name === "Gasoline") {
			// gasoline is the remedy for this card
			return true;
		} else if (card.area === CardArea.Speed) {
			// other than roll, we don't care about the speed area
			return true;
		} else {
			return false;
		}
	}
}

export class FlatTire extends ActionCard {
	constructor() {
		super(CardArea.Battle, CardKind.Hazard);
	}

	check(card: Card): boolean {
		if (card.constructor.name === "Roll") {
			// roll is not allowed
			return false;
		} else if (card.constructor.name === "SpareTire") {
			// spare tire is the remedy for this card
			return true;
		} else if (card.area === CardArea.Speed) {
			// other than roll, we don't care about the speed area
			return true;
		} else {
			return false;
		}
	}
}

export class Accident extends ActionCard {
	constructor() {
		super(CardArea.Battle, CardKind.Hazard);
	}

	check(card: Card): boolean {
		if (card.constructor.name === "Roll") {
			// roll is not allowed
			return false;
		} else if (card.constructor.name === "Repair") {
			// repair is the remedy for this card
			return true;
		} else if (card.area === CardArea.Speed) {
			// other than roll, we don't care about the speed area
			return true;
		} else {
			return false;
		}
	}
}

export class SpeedLimit extends ActionCard {
	constructor() {
		super(CardArea.Speed, CardKind.Hazard);
	}

	check(card: Card): boolean {
		if (card.constructor.name === "EndOfLimit") {
			// end of limit is this card's remedy
			return true;
		} else if (card.area === CardArea.Speed) {
			// otherwise, speed cards are restricted
			return false;
		} else if (card.constructor.name === "Distance75") {
			// too fast
			return false;
		} else if (card.constructor.name === "Distance100") {
			// too fast!
			return false;
		} else if (card.constructor.name === "Distance200") {
			// way too fast!!
			return false;
		} else {
			return true;
		}
	}
}

export class Gasoline extends ActionCard {
	constructor() {
		super(CardArea.Battle, CardKind.Remedy);
	}

	check(card: Card): boolean {
		if (card.kind === CardKind.Hazard) {
			// any hazard is fine
			return true;
		} else if (card.area === CardArea.Battle) {
			// remedies in the undamaged battle area are a no go
			return false;
		} else {
			return true;
		}
	}
}

export class SpareTire extends ActionCard {
	constructor() {
		super(CardArea.Battle, CardKind.Remedy);
	}

	check(card: Card): boolean {
		if (card.kind === CardKind.Hazard) {
			// any hazard is fine
			return true;
		} else if (card.area === CardArea.Battle) {
			// remedies in the undamaged battle area are a no go
			return false;
		} else {
			return true;
		}
	}
}

export class Stop extends ActionCard {
	constructor() {
		super(CardArea.Speed, CardKind.Hazard);
	}

	check(card: Card): boolean {
		if (card.constructor.name === "Roll") {
			// roll is this card's remedy
			return true;
		} else if (card.area === CardArea.Speed) {
			// otherwise, speed cards are restricted
			return false;
		} else if (card.kind === CardKind.Distance) {
			// too fast
			return false;
		} else {
			return true;
		}
	}
}

export class Repair extends ActionCard {
	constructor() {
		super(CardArea.Battle, CardKind.Remedy);
	}

	check(card: Card): boolean {
		if (card.kind === CardKind.Hazard) {
			// any hazard is fine
			return true;
		} else if (card.area === CardArea.Battle) {
			// remedies in the undamaged battle area are a no go
			return false;
		} else {
			return true;
		}
	}
}

export class Roll extends ActionCard {
	constructor() {
		super(CardArea.Speed, CardKind.Remedy);
	}

	check(card: Card): boolean {
		if (card.kind === CardKind.Hazard) {
			// any hazard is fine
			return true;
		} else if (card.area === CardArea.Speed) {
			// remedies in the undamaged speed area are a no go
			return false;
		} else {
			return true;
		}
	}
}

export class EndOfLimit extends ActionCard {
	constructor() {
		super(CardArea.Speed, CardKind.Remedy);
	}

	check(card: Card): boolean {
		if (card.constructor.name === "EndOfLimit") {
			// can't play a card on itself
			return false;
		} else {
			return true;
		}
	}
}

export class AceDriver extends ActionCard {
	constructor() {
		super(CardArea.Safety, CardKind.Safety);
	}

	check(card: Card): boolean {
		if (card.constructor.name === "Accident") {
			return false;
		} else {
			return true;
		}
	}
}

export class EmergencyVehicle extends ActionCard {
	constructor() {
		super(CardArea.Safety, CardKind.Safety);
	}

	check(card: Card): boolean {
		if (card.constructor.name === "Stop") {
			return false;
		} else if (card.constructor.name === "SpeedLimit") {
			return false;
		} else {
			return true;
		}
	}
}

export class ExtraTank extends ActionCard {
	constructor() {
		super(CardArea.Safety, CardKind.Safety);
	}

	check(card: Card): boolean {
		if (card.constructor.name === "OutOfGas") {
			return false;
		} else {
			return true;
		}
	}
}

export class PunctureProofTires extends ActionCard {
	constructor() {
		super(CardArea.Safety, CardKind.Safety);
	}

	check(card: Card): boolean {
		if (card.constructor.name === "FlatTire") {
			return false;
		} else {
			return true;
		}
	}
}

export class Distance25 extends DistanceCard {
	constructor() {
		super(CardArea.Distance, CardKind.Distance);
	}

	get distance(): number {
		return 25;
	}
}

export class Distance50 extends DistanceCard {
	constructor() {
		super(CardArea.Distance, CardKind.Distance);
	}

	get distance(): number {
		return 50;
	}
}

export class Distance75 extends DistanceCard {
	constructor() {
		super(CardArea.Distance, CardKind.Distance);
	}

	get distance(): number {
		return 75;
	}
}

export class Distance100 extends DistanceCard {
	constructor() {
		super(CardArea.Distance, CardKind.Distance);
	}

	get distance(): number {
		return 100;
	}
}

export class Distance200 extends DistanceCard {
	constructor() {
		super(CardArea.Distance, CardKind.Distance);
	}

	get distance(): number {
		return 200;
	}
}
