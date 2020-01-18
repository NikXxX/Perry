let lang = "fr";
module.exports = class {
  constructor(...args) {
    this.language = {
      PREFIX_INFO: (prefix) => `Mon préfix est ${prefix} sur ce serveur!`
    };
  }
};
