import _ from 'lodash';

export default function paginate(stocks, maxSize, currentScroll) {
    const startIndex = (currentScroll - 1) * maxSize;
    return _(stocks).slice(startIndex).take(maxSize).value();
}