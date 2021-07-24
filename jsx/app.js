const jsx = (templates, ...args) => {
  return templates.map((template, i) => `${template}${args[i] ?? ''}`).join('');
};

const html = jsx;

const lit = 'hihi everyone';
const html = html`<div>안녕하세요 ${lit} {name}님 {welcome}</div>`;

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

  inject(str) {
    return str.replace(/{(.*?)}/g, (_, g) => this[g]);
  }

  render() {
    this.root.innerHTML = this.inject(jsx`${html}`);
  }
}

const test = new TestView({ app: document.body });
test.render();
