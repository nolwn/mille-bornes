import { expect } from "chai";
import {
	Accident,
	AceDriver,
	ActionCard,
	Card,
	CardArea,
	CardKind,
	Distance25,
	Distance50,
	Distance75,
	Distance100,
	Distance200,
	EmergencyVehicle,
	EndOfLimit,
	ExtraTank,
	FlatTire,
	Gasoline,
	OutOfGas,
	PunctureProofTires,
	Repair,
	Roll,
	SpareTire,
	SpeedLimit,
	Stop,
} from "../Card";
import Player from "../Player";
import { TestActionCard } from "./TestCard";

const accident = new Accident();
const distance25 = new Distance25();
const distance50 = new Distance50();
const distance75 = new Distance75();
const distance100 = new Distance100();
const distance200 = new Distance200();
const endOfLimit = new EndOfLimit();
const flatTire = new FlatTire();
const gasoline = new Gasoline();
const spareTire = new SpareTire();
const speedLimit = new SpeedLimit();
const outOfGas = new OutOfGas();
const repairs = new Repair();
const roll = new Roll();
const stop = new Stop();
const aceDriver = new AceDriver();
const emergencyVehicle = new EmergencyVehicle();
const extraTank = new ExtraTank();
const punctureProofTires = new PunctureProofTires();
const distacneCards = [
	distance25,
	distance50,
	distance75,
	distance100,
	distance200,
];
const actionCards = [
	outOfGas,
	flatTire,
	accident,
	speedLimit,
	stop,
	gasoline,
	spareTire,
	repairs,
	endOfLimit,
	roll,
];

describe("Cards", () => {
	let player: Player;
	let target: Player;

	beforeEach(() => {
		player = new Player();
		target = new Player();
	});

	it("creates a new card", () => {
		const card = new TestActionCard(CardArea.Battle, CardKind.Distance, true);
		const { area, kind } = card;

		expect(area).to.equal(CardArea.Battle);
		expect(kind).to.equal(CardKind.Distance);
	});

	// TODO: replace this with tests against actual cards
	it("runs rules against other cards", () => {
		const permissiveCard = new TestActionCard(
			CardArea.Battle,
			CardKind.Hazard,
			true
		);

		let result = permissiveCard.check(permissiveCard);
		expect(result).to.be.true;

		const restrictiveCard = new TestActionCard(
			CardArea.Battle,
			CardKind.Hazard,
			false
		);

		result = restrictiveCard.check(permissiveCard);
		expect(result).to.be.false;
	});

	describe("Out of Gas", () => {
		it("is a hazard card for the battle area", () => {
			const { kind, area } = outOfGas;

			expect(kind).to.equal(CardKind.Hazard);
			expect(area).to.equal(CardArea.Battle);
		});

		it("blocks all distance cards, spare tire, repair roll, and itself", () => {
			const restricted = [
				...distacneCards,
				spareTire,
				accident,
				flatTire,
				outOfGas,
				repairs,
				roll,
			];

			checkCards(outOfGas, restricted);
		});
	});

	describe("Flat Tire", () => {
		it("is a hazard card for the battle area", () => {
			const { area, kind } = flatTire;

			expect(area).to.equal(CardArea.Battle);
			expect(kind).to.equal(CardKind.Hazard);
		});

		it("blocks all distance cards, out of gas, accident, gasoline, roll, repair and itself", () => {
			const restricted = [
				...distacneCards,
				outOfGas,
				accident,
				gasoline,
				flatTire,
				repairs,
				roll,
			];

			checkCards(flatTire, restricted);
		});
	});

	describe("Accident", () => {
		it("is a hazard card for the battle area", () => {
			const { area, kind } = accident;

			expect(area).to.equal(CardArea.Battle);
			expect(kind).to.equal(CardKind.Hazard);
		});

		it("blocks all distance cards, out of gas, flat tire, gasoline, spare tire, roll and itself", () => {
			const restricted = [
				...distacneCards,
				spareTire,
				outOfGas,
				flatTire,
				gasoline,
				accident,
				roll,
			];

			checkCards(accident, restricted);
		});
	});

	describe("Speed Limit", () => {
		it("is a hazard card for the speed area", () => {
			const { area, kind } = speedLimit;

			expect(area).to.equal(CardArea.Speed);
			expect(kind).to.equal(CardKind.Hazard);
		});

		it("blocks distance 75, distance 100, distance 200, stop, roll and itself", () => {
			const restricted = [
				distance75,
				distance100,
				distance200,
				speedLimit,
				stop,
				roll,
			];

			checkCards(speedLimit, restricted);
		});
	});

	describe("Stop", () => {
		it("is a hazard card for the speed area", () => {
			const { area, kind } = stop;

			expect(area).to.equal(CardArea.Speed);
			expect(kind).to.equal(CardKind.Hazard);
		});

		it("blocks all distance cards, speed limit, end of limit and itself", () => {
			const restricted = [...distacneCards, speedLimit, endOfLimit, stop];

			checkCards(stop, restricted);
		});
	});

	describe("Gasoline", () => {
		it("is a remedy card for the battle area", () => {
			const { area, kind } = gasoline;

			expect(area).to.equal(CardArea.Battle);
			expect(kind).to.equal(CardKind.Remedy);
		});

		it("blocks spare tire, repairs and itself", () => {
			const restricted = [spareTire, repairs, gasoline];

			checkCards(gasoline, restricted);
		});
	});

	describe("Spare Tire", () => {
		it("is a remedy card for the battle area", () => {
			const { area, kind } = spareTire;

			expect(area).to.equal(CardArea.Battle);
			expect(kind).to.equal(CardKind.Remedy);
		});

		it("blocks repairs, gasoline and itself", () => {
			const restricted = [repairs, gasoline, spareTire];

			checkCards(spareTire, restricted);
		});
	});

	describe("Repairs", () => {
		it("is a remedy card for the battle area", () => {
			const { area, kind } = repairs;

			expect(area).to.equal(CardArea.Battle);
			expect(kind).to.equal(CardKind.Remedy);
		});

		it("blocks spare tire, repairs and itself", () => {
			const restricted = [spareTire, repairs, gasoline];

			checkCards(repairs, restricted);
		});
	});

	describe("Roll", () => {
		it("is a remedy card for the speed area", () => {
			const { area, kind } = roll;

			expect(area).to.equal(CardArea.Speed);
			expect(kind).to.equal(CardKind.Remedy);
		});

		it("blocks end of limit and itself", () => {
			const restricted = [endOfLimit, roll];

			checkCards(roll, restricted);
		});
	});

	describe("End of Limit", () => {
		it("is a remedy for the speed area", () => {
			const { area, kind } = endOfLimit;

			expect(area).to.equal(CardArea.Speed);
			expect(kind).to.equal(CardKind.Remedy);
		});

		it("blocks itself", () => {
			const restricted = [endOfLimit];

			checkCards(endOfLimit, restricted);
		});
	});

	describe("Extra Tank", () => {
		it("is a safety card for the safety area", () => {
			const { area, kind } = extraTank;

			expect(area).to.equal(CardArea.Safety);
			expect(kind).to.equal(CardKind.Safety);
		});

		it("blocks Out of Gas", () => {
			const restricted = [outOfGas];

			checkCards(extraTank, restricted);
		});
	});

	describe("Emergency Vehicle", () => {
		it("is a safety card for the safety area", () => {
			const { area, kind } = extraTank;

			expect(area).to.equal(CardArea.Safety);
			expect(kind).to.equal(CardKind.Safety);
		});

		it("blocks Speed Limit and Stop", () => {
			const restricted = [speedLimit, stop];

			checkCards(emergencyVehicle, restricted);
		});
	});

	describe("Ace Driver", () => {
		it("is a safety card for the safety area", () => {
			const { area, kind } = aceDriver;

			expect(area).to.equal(CardArea.Safety);
			expect(kind).to.equal(CardKind.Safety);
		});

		it("blocks accident", () => {
			const restricted = [accident];

			checkCards(aceDriver, restricted);
		});
	});

	describe("Puncture Proof Tires", () => {
		it("is a safety card for the safety area", () => {
			const { area, kind } = punctureProofTires;

			expect(area).to.equal(CardArea.Safety);
			expect(kind).to.equal(CardKind.Safety);
		});

		it("blocks Flat Tire", () => {
			const restricted = [flatTire];

			checkCards(punctureProofTires, restricted);
		});
	});

	describe("distance cards", () => {
		it("distance cards have correct area and kind", () => {
			let { area, kind } = distance25;
			expect(area).to.equal(CardArea.Distance);
			expect(kind).to.equal(CardKind.Distance);

			area = distance50.area;
			kind = distance50.kind;
			expect(area).to.equal(CardArea.Distance);
			expect(kind).to.equal(CardKind.Distance);

			area = distance75.area;
			kind = distance75.kind;
			expect(area).to.equal(CardArea.Distance);
			expect(kind).to.equal(CardKind.Distance);

			area = distance100.area;
			kind = distance100.kind;
			expect(area).to.equal(CardArea.Distance);
			expect(kind).to.equal(CardKind.Distance);

			area = distance200.area;
			kind = distance200.kind;
			expect(area).to.equal(CardArea.Distance);
			expect(kind).to.equal(CardKind.Distance);
		});

		it("distance cards have correct distances", () => {
			let { distance } = distance25;
			expect(distance).to.equal(25);

			distance = distance50.distance;
			expect(distance).to.equal(50);

			distance = distance75.distance;
			expect(distance).to.equal(75);

			distance = distance100.distance;
			expect(distance).to.equal(100);

			distance = distance200.distance;
			expect(distance).to.equal(200);
		});
	});
});

function checkCards(card: ActionCard, restricted: Card[]): void {
	for (const restrictedCard of [...actionCards, ...distacneCards]) {
		const check = card.check(restrictedCard);

		if (restricted.find((c) => c === restrictedCard)) {
			expect(check).to.be.false;
		} else {
			expect(check).to.be.true;
		}
	}
}
