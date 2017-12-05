var ScoreModifyer = function(){
    this.mod = 0;
    this.multiplyer = 1;
    this.bonus = 0;
};

ScoreModifyer.prototype.setBonus = function(){
    this.bonus = this.mod * this.multiplyer;
};

ScoreModifyer.prototype.getBonus = function(){
    return this.bonus;
}
