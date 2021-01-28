module.exports = class Util {
    static getStadistics(level) {
        let result, nextPL, oldPL, oldLevel;

        nextPL = level * (level + level) / 2 * 19.5 * 2.565, oldLevel = level - 1;
        oldPL = oldLevel * (oldLevel + oldLevel) / 2 * 19.5 * 2.565;

        result = { oldPL: Math.floor(oldPL), nextPL: Math.floor(nextPL) };

        return result;
    }

    static incrementXP(envIncrement){
        const number = Number.parseInt(envIncrement);
        if (Number.isNaN(number)) return 1;        
        return number;
    }
}