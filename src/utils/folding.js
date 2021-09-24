exports.install = function (Vue, options) {

    Vue.prototype.deepCopy = (data) => {

        return JSON.parse(JSON.stringify(data));

    };

    Vue.prototype.inArray = (array, target) => {

        let exist = false;

        for (let index in array) {

            if (array[index] === target) {

                exist = true;

                break;
            }

        }

        return exist;

    };

    Vue.prototype.isNumber = (data, exclude_zero) => {

        let exist = false;

        for (let index in array) {

            if (array[index] === target) {

                exist = true;

                break;
            }

        }

        return exist;

    };
};