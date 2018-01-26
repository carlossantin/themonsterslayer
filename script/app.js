new Vue({
  el: '#app',
  data: {
    userPower: 100,
    monsterPower: 100,
    gameStarted: false,
    monsterHealthBar: {
      width: '100%'
    },  
    userHealthBar: {
      width: '100%'
    },
    log: []   
  },
  methods: {
    startNewGame: function() {
      this.userPower = 100;
      this.monsterPower = 100;
      this.gameStarted = true;
      this.log = [];
    },
    attackMonster: function() {
      var monsterHit = this.calculateDamage(10, 3);
      this.monsterPower -= monsterHit;
      var userHit = this.calculateDamage(10, 3);
      this.userPower -= userHit;
      this.fixInvalidPower();  
      this.logAction(monsterHit, userHit);
      this.checkGameFinished();        
    },
    specialAttack: function() {
      var monsterHit = this.calculateDamage(20, 5);
      this.monsterPower -= monsterHit;
      var userHit = this.calculateDamage(10, 3);
      this.userPower -= userHit;
      this.fixInvalidPower();  
      this.logAction(monsterHit, userHit);
      this.checkGameFinished();
    },
    heal: function() {
      var userHit = this.calculateDamage(10, 3);
      this.userPower += userHit;
      this.fixInvalidPower();  
    },
    logAction: function(monsterHit, userHit) {
      this.log.unshift({isPlayer: true, text:"PLAYER HITS MONSTER FOR " + monsterHit});
      this.log.unshift({isPlayer: false, text:"MONSTER HITS PLAYER FOR " + userHit});
    },
    fixInvalidPower: function() {
      if (this.monsterPower < 0) {
        this.monsterPower = 0;
      } else if (this.monsterPower > 100) {
        this.monsterPower = 100;
      }
      if (this.userPower < 0) {
        this.userPower = 0;
      } else if (this.userPower > 100) {
        this.userPower = 100;
      }
    },
    checkGameFinished: function() {
      if (this.monsterPower <= 0) {        
        alert('You won!');
        this.gameStarted = false;
        return true;
      } else if (this.userPower <= 0) {
        alert('You lost!');
        this.gameStarted = false;
        return true;
      }
      return false;
    },
    calculateDamage(max, min) {
      return Math.max(parseInt(Math.random() * max), min);
    }
  },
  watch: {
    monsterPower: function() {
      this.monsterHealthBar.width = this.monsterPower + '%'
    },
    userPower: function() {
      this.userHealthBar.width = this.userPower + '%'
    }
  }
});
