import CoreCombatLogParser from 'parser/core/CombatLogParser';
import DamageDone from 'parser/core/modules/DamageDone';

import Checklist from './modules/checklist/Module';

import PrePullCooldowns from '../shared/normalizers/PrePullCooldowns';

import Abilities from './modules/features/Abilities';
import AlwaysBeCasting from './modules/features/AlwaysBeCasting';
import CooldownThroughputTracker from './modules/features/CooldownThroughputTracker';
import WintersChill from './modules/features/WintersChill';
import BrainFreeze from './modules/features/BrainFreeze';
import IceLance from './modules/features/IceLance';
import ThermalVoid from './modules/features/ThermalVoid';
import GlacialSpike from './modules/features/GlacialSpike';
import BoneChilling from './modules/features/BoneChilling';
import RuneOfPower from '../shared/modules/features/RuneOfPower';
import MirrorImage from '../shared/modules/features/MirrorImage';
import ArcaneIntellect from '../shared/modules/features/ArcaneIntellect';
import SplittingIce from './modules/features/SplittingIce';
import CancelledCasts from '../shared/modules/features/CancelledCasts';
import WintersReach from './modules/traits/WintersReach';
import Whiteout from './modules/traits/Whiteout';
import FrozenOrb from './modules/cooldowns/FrozenOrb';
import ColdSnap from './modules/cooldowns/ColdSnap';


class CombatLogParser extends CoreCombatLogParser {
  static specModules = {
    checklist: Checklist,

    // Normalizers
    prePullCooldowns: PrePullCooldowns,

    // Features
    abilities: Abilities,
    alwaysBeCasting: AlwaysBeCasting,
    cancelledCasts: CancelledCasts,
    cooldownThroughputTracker: CooldownThroughputTracker,
	  wintersChill: WintersChill,
	  brainFreeze: BrainFreeze,
    iceLance: IceLance,
	  thermalVoid: ThermalVoid,
	  glacialSpike: GlacialSpike,
    damageDone: [DamageDone, { showStatistic: true }],
    runeOfPower: RuneOfPower,
    mirrorImage: MirrorImage,
    arcaneIntellect: ArcaneIntellect,
    splittingIce: SplittingIce,
    boneChilling: BoneChilling,

    //Traits
    wintersReach: WintersReach,
    whiteout: Whiteout,

	  //Cooldowns
    frozenOrb: FrozenOrb,
    coldSnap: ColdSnap,
  };
}

export default CombatLogParser;
