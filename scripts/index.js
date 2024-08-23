import {getMovementActionCountForToken, getSpeedForToken} from './util.js';


Hooks.once('dragRuler.ready', (SpeedProvider) => {
  class Pf2eSpeedProvider extends SpeedProvider {
    get colors() {
      return [
        {id: 'action1', default: 0x00FF00, name: 'dragruler-pf2e.firstAction'},
        {id: 'action2', default: 0xFFFF00, name: 'dragruler-pf2e.secondAction'},
        {id: 'action3', default: 0x0000FF, name: 'dragruler-pf2e.thirdAction'},
        {id: 'action4', default: 0xEE82EE, name: 'dragruler-pf2e.fourthAction'},
      ]
    }

    getRanges(token) {
      const speed = getSpeedForToken(token);
      const actions = getMovementActionCountForToken(token);
      const ranges = [];
      for (let i = 1; i <= actions; i++) {
        ranges.push({range: speed * i, color: `action${i}`});
      }
      if (ranges.length === 0) {
        // Always return at least 1 range, otherwise the ruler defaults to the normal orange ruler instead of the red ruler
        return [{range: 0, color: 'action1'}];
      }
      return ranges;
    }
  }

  dragRuler.registerModule('dragruler-pf2e', Pf2eSpeedProvider);
});
