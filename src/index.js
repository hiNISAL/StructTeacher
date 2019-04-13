import { isObject, isFunction, isNumber, isString, isBoolean } from './utils/utils';
class Teacher {
  // public model: any = {};
  // public sourceData: any = {};
  // private defaultValue: any = {};

  static Factory(model, sourceData) {
    return new Teacher(model, sourceData);
  }

  constructor(model, sourceData, nameSpace = { type: 'type', default: 'default', all: 'all' }) {
    this.model = model;
    this.sourceData = sourceData;
  }

  setNameSpace(nameSpace) {
    this.nameSpace = nameSpace;
  }

  doFix(model = this.model, sourceData = this.sourceData, newData = {}) {
    for (const [k, v] of Object.entries(model)) {
      // 如果是数组
      if (Array.isArray(v)) {
        // 新对象当前这个k设置为空数组
        newData[k] = [];

        sourceData[k].forEach((item, index) => {
          if (model[k][0].all) {
            model[k][index] = model[k][0];
          }
          if (model[k][index].type && [String, Number, Boolean].includes(model[k][index].type)) {

            // 说明是基础类型
            let val = item;
            if (!item) {
              val = model[k][index].default;
            }

            newData[k][index] = val;
            return;
          }

          // 如果当前这一项是对象
          if (isObject(item)) {
            newData[k][index] = {};
            this.doFix(model[k][index], item, newData[k][index]);
            return;
          }

          // 如果当前这一项是数组
          if (Array.isArray(item)) {
            newData[index] = [];
            this.doFix(model[k][0], item, newData[index]);
            return;
          }

          newData[k] = sourceData[k];
        });
        continue;
      }

      // 如果原数据没有 则赋值默认值
      if (!sourceData[k]) {
        newData[k] = v.default;
        continue;
      }
      console.log(v);
      if (!v.type) {
        newData[k] = {};
        this.doFix({...v}, sourceData[k], newData[k]);
        continue;
      }

      newData[k] = sourceData[k];
    }
  }

  fix() {
    const newData = {};

    this.doFix(this.model, this.sourceData, newData);

    console.log(newData);
    console.log(JSON.stringify(newData));
  }

  setDefault(val) {
    this.defaultValue = val;
  }
}

export default Teacher;

var a = {
  url: undefined,
  count: 1,
  name: {
    first: undefined,
    last: [undefined, 'i', 's', 'a', 'l']
  },
  list: [
    {
      a: undefined,
      b: 2,
      c: 3,
      d: [undefined, 2, {e: 2}],
      info: {
        name: 'abc',
        age: 17
      }
    },
    {
      a: undefined,
      b: 2,
      c: 3,
      d: [undefined, 2, {e: 2}],
      info: {
        name: 'abc',
        age: 17
      }
    },
  ]
}

const model = {
  url: {
    type: String,
    default: 'none',
  },
  count: {
    type: String,
    default: '',
  },
  name: {
    first: {
      type: String,
      default: 'abc'
    },
    last: [
      {
        type: String,
        default: '0',
        all: true,
      }
    ]
  },
  list: [
    {
      a: {
        type: Number,
        default: 3,
      },
      b: {
        type: Number,
        default: 0,
      },
      c: {
        type: Number,
        default: 0,
      },
      d: [
        {
          type: Number,
          default: 233,
        },
        {
          type: Number,
          default: 223,
        },
        {
          e: {
            type: Number,
            default : 1233,
          },
          d: {
            type: Number,
            default: 332
          }
        },
      ],
      info: {
        type: Object,
        default: {
          name: '',
          age: 0,
        },
        name: {
          type: String,
          default: '',
        },
        age: {
          type: Number,
          default: 0,
        },
      },
    }
  ]
}

const fac = Teacher.Factory(model, a);

// console.log(fac);

fac.fix();
