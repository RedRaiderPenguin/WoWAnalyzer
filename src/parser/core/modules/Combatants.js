import Entities from './Entities';
import Combatant from '../Combatant';

class Combatants extends Entities {
  players = {};
  get playerCount() {
    return Object.keys(this.players).length;
  }
  getEntities() {
    return this.players;
  }
  getEntity(event) {
    const targetId = event.targetID;
    const combatant = this.players[targetId];
    if (!combatant) {
      return null; // a pet or something probably, either way we don't care.
    }
    return combatant;
  }

  /** @returns Combatant */
  get selected() {
    return this.players[this.owner.playerId];
  }

  constructor(...args) {
    super(...args);
    this.owner.combatantInfoEvents.forEach(combatantInfo => {
      if (combatantInfo.error) {
        console.error(`Error retrieving combatant information for player with sourceID ${combatantInfo.sourceID}`);
        return;
      }

      this.players[combatantInfo.sourceID] = new Combatant(this.owner, combatantInfo);

      combatantInfo.auras.forEach((aura) => {
        this.applyBuff({
          ability: {
            abilityIcon: aura.icon,
            guid: aura.ability,
          },
          sourceID: aura.source,
          targetID: combatantInfo.sourceID,
          timestamp: combatantInfo.timestamp,
        });
      });
    });
  }

  on_applybuff(event) {
    if (event.__fromCombatantinfo) {
      // We already scan the `combatantinfo` auras, so adding it here would be duplicating which causes a lot of issues.
      // We need to use `combatantinfo` so that our buffs are already available when just the `combatantinfo` events are available (for display purposes).
      return;
    }
    super.on_applybuff(event);
  }
}

export default Combatants;
