import React from 'react';

import SPELLS from 'common/SPELLS';
import SpellIcon from 'common/SpellIcon';
import { formatNumber } from 'common/format';

import Analyzer from 'parser/core/Analyzer';
import calculateEffectiveHealing from 'parser/core/calculateEffectiveHealing';
import Combatants from 'parser/core/modules/Combatants';

import StatisticBox, { STATISTIC_ORDER } from 'interface/others/StatisticBox';

const debug = false;
const EVM_HEALING_INCREASE = 0.3;

const UNAFFECTED_SPELLS = [
  SPELLS.CRANE_HEAL.id,
  SPELLS.ENVELOPING_MIST.id,
];

class EnvelopingMists extends Analyzer {
  static dependencies = {
    combatants: Combatants,
  };

  healing = 0;

  on_byPlayer_heal(event) {
    const targetId = event.targetID;
    const spellId = event.ability.guid;

    if (UNAFFECTED_SPELLS.includes(spellId)) {
      debug && console.log('Exiting');
      return;
    }

    if (this.combatants.players[targetId]) {
      if (this.combatants.players[targetId].hasBuff(SPELLS.ENVELOPING_MIST.id, event.timestamp, 0, 0) === true) {
        this.healing += calculateEffectiveHealing(event, EVM_HEALING_INCREASE);
        debug && console.log('Event Details for Healing Increase: ' + event.ability.name);
      }
    }
  }

  on_finished() {
    if (debug) {
      console.log(`EvM Healing Contribution: ${this.healing}`);
    }
  }

  statistic() {
    return (
      <StatisticBox
        postion={STATISTIC_ORDER.OPTIONAL(50)}
        icon={<SpellIcon id={SPELLS.ENVELOPING_MIST.id} />}
        value={`${formatNumber(this.healing)}`}
        label={(
          <dfn data-tip="This is the effective healing contributed by the Eveloping Mists buff.">
            Healing Contributed
          </dfn>
        )}
      />
    );
  }
}

export default EnvelopingMists;
