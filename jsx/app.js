const jsx = (templates, ...args) => {
  return templates.map((template, i) => `${template}${args[i] ?? ''}`).join('');
};

const html = jsx;

const lit = 'hihi everyone';
const myhtml = html`<div>
  안녕하세요 ${lit} {name}님 {welcome}
  <h1>자동완성도 되네요~</h1>
  <input type="text" />
  <button>입력 후 클릭해보세요</button>
</div>`;

class TestView {
  constructor({ app }) {
    this.root = app;
    this.data = {};
    Object.assign(this.data, this.#data());

    console.log(this);
  }

  #data() {
    return {
      name: '여러분',
      welcome: '반갑습니다',
    };
  }

  setData(data) {
    this.data = { ...this.data, ...data };
    this.render();
  }

  onClick(e) {
    this.setData({ name: e.target.previousElementSibling.value });
  }

  inject(str) {
    return str.replace(/{(.*?)}/g, (_, g) => this.data[g]);
  }

  render() {
    this.root.innerHTML = this.inject(jsx`${myhtml}`);

    this.root.querySelector('button').addEventListener('click', this.onClick.bind(this));
  }
}

const test = new TestView({ app: document.body });
test.render();
