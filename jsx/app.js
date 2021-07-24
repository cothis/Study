let html = '<div>안녕하세요 {name}님 {welcome}</div>';

class TestView {
  constructor({ app }) {
    this.root = app;
    Object.assign(this, this.#data());
  }

  #data() {
    return {
      name: '인규',
      welcome: '반갑습니다',
    };
  }

  jsx(templates, ...args) {
    return this.inject(templates.map((template, i) => `${template}${args[i] ?? ''}`).join(''));
  }

  inject(str) {
    return str.replace(/{(.*?)}/g, (_, g) => this[g]);
  }

  render() {
    this.root.innerHTML = this.jsx`${html}`;
  }
}

const test = new TestView({ app: document.body });
test.render();
