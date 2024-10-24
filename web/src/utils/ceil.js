const ceil = (option, dayjsClass) => {
  dayjsClass.prototype.ceil = function (amount, unit) {
    return this.add(amount - (this.get(unit) % amount), unit).startOf(unit);
  };
};
export default ceil;
