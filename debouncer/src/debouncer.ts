const $ = (query: string, $el = document): Element => {
  const $result = $el.querySelector(query);
  if (!$result) throw '검색 대상이 없습니다';
  return $result;
};

// const $text = $('#text');
// const $message = $('#message');
// let number = 0;

/**기본 코드
 * input tag에 값이 입력되면 그 값을 message에 적용
 * number + 1한 결과를 number에 저장
 * number를 출력
 * */
// $text.addEventListener('input', (e) => {
//   const $currentTarget = <HTMLInputElement>e.currentTarget;
//   if (!$currentTarget) throw 'event target이 없습니다';

//   $message.innerHTML = $currentTarget.value;
//   number = number + 1;
//   console.log(number);
// });

/** debounce 적용
 * input tag에 값이 입력되면 그 값을 message에 적용
 * 단, 입력중엔 적용하지 않고, 마지막 입력하고 1초 후 실행
 */
// let timer: number | undefined = undefined;
// $text.addEventListener('input', (e) => {
//   const $currentTarget = <HTMLInputElement>e.currentTarget;
//   if (!$currentTarget) throw 'event target이 없습니다';

//   if (timer) {
//     clearTimeout(timer);
//   }
//   timer = setTimeout(() => {
//     $message.innerHTML = $currentTarget.value;
//     number = number + 1;
//     console.log(number);
//   }, 1000);
// });

/** debouncer 모듈화 */
// const debouncer = () => {
//   let timer: number | undefined = undefined;

//   return (callback: TimerHandler, timeout: number = 0, ...params: any[]) => {
//     if (timer) clearTimeout(timer);
//     timer = setTimeout(callback, timeout, ...params);
//   };
// };

// const timeout = debouncer();
// $text.addEventListener('input', (e) => {
//   const $currentTarget = <HTMLInputElement>e.currentTarget;
//   if (!$currentTarget) throw 'event target이 없습니다';

//   timeout(() => {
//     $message.innerHTML = $currentTarget.value;
//     number = number + 1;
//     console.log(number);
//   }, 1000);
// });

/** return 값을 넘겨받을 수 있도록 개선 */
const debouncer = <T>() => {
  let timer: number | undefined = undefined;

  return (callback: Function, timeout: number = 0, ...params: any[]): Promise<T> => {
    if (timer) clearTimeout(timer);
    return new Promise<T>((resolve) => {
      timer = setTimeout(() => {
        resolve(callback(...params));
      }, timeout);
    });
  };
};

const $text = $('#text');
const $message = $('#message');
let number = 0;

const timeout = debouncer<number>();
$text.addEventListener('input', async (e) => {
  const $currentTarget = <HTMLInputElement>e.currentTarget;
  if (!$currentTarget) throw 'event target이 없습니다';

  number = await timeout(
    (value: number) => {
      $message.innerHTML = $currentTarget.value;
      return value + 1;
    },
    1000,
    number
  );

  console.log(number);
});

const $id = <HTMLInputElement>$('#id');
const $age = <HTMLInputElement>$('#age');

interface ValidItem {
  readonly condition: RegExp | Function;
  readonly match: boolean;
}

interface ValidResult {
  readonly index: number;
  readonly item: ValidItem;
}

const Validator = () => {
  const validMap = new Map<HTMLInputElement, ValidItem[]>();

  const addValid = (target: HTMLInputElement, item: ValidItem) => {
    if (!validMap.has(target)) {
      validMap.set(target, []);
    }
    validMap.get(target)?.push(item);
  };

  const checkValid = (target: HTMLInputElement): ValidResult => {
    const items = validMap.get(target);
    if (!items) throw new Error('target이 없습니다');

    const index = items.findIndex((item) => {
      if (typeof item.condition === 'function') {
        return item.condition() !== item.match;
      } else {
        return item.condition.test(target.value) !== item.match;
      }
    });

    return { index, item: items[index] };
  };

  return { addValid, checkValid };
};

const { addValid, checkValid } = Validator();

addValid($id, { condition: /[a-z]+/, match: true });
addValid($age, { condition: /[0-9]/g, match: true });

const inputDebouncer = debouncer<ValidResult>();
const idInputHandler = async (e: Event) => {
  const { index, item } = await inputDebouncer(checkValid, 300, <HTMLInputElement>e.currentTarget);
  $message.innerHTML = `id가 ${index < 0 ? '정상입니다' : '잘못됐습니다'}`;
  console.log(index);
};

$id.addEventListener('input', idInputHandler);
$age.addEventListener('input', (e) => console.log(checkValid(<HTMLInputElement>e.currentTarget)));
