/* Implementation of fundamental sorting algorithms */

function bubbleSort(arr, comparator = (a, b) => a - b) {
    for(let i = 0; i < arr; i++) {
        for(let j = 0; j < arr.length - 1 - i; j++) {
            if (comparator(arr[j], arr[j + 1]) > 0) {
                swap(arr, j, j + 1);
            }
        }
    }
    return arr;
}

function selectionSortV1(arr, comparator = (a, b) => a - b) {
    for(let i = 0; i < arr.length - 1; i++) {
        let min = i;
        for(let j = i + 1; j < arr.length; j++) {
            if (comparator(arr[min], arr[j]) > 0) {
                min = j;
            }
        }
        swap(arr, i, min);
    }
    return arr;
}

function selectionSortV2(arr, comparator = (a, b) => a - b) {
    for(let i = arr.length - 1; i > 0; i--) {
        let max = i;
        for(let j = 0; j < i; j++) {
            if (comparator(arr[j], arr[max]) > 0) {
                max = j;
            }
        }
        swap(arr, i, max);
    }
    return arr;
}

function insertionSort(arr, comparator = (a, b) => a - b) {
    for(let i = 1; i < arr.length; i++) {
        let j = i;
        const toInsert = arr[j];
        while(j > 0 && comparator(arr[j - 1], toInsert) > 0) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = toInsert;
    }
    return arr;
}

function mergeSort(arr, comparator = (a, b) => a - b) {
    mergeSortHelper(arr, comparator);
    return arr;
    function mergeSortHelper(arr, comparator) {
        if (arr.length < 2) {
            return;
        }
        const mid = Math.floor(arr.length / 2),
            left = arr.slice(0, mid),
            right = arr.slice(mid);
        mergeSortHelper(left, comparator);
        mergeSortHelper(right, comparator);
        merge(arr, left, right, comparator);
        function merge(arr, left, right, comparator) {
            let a = 0, l = 0, r = 0;
            while(l < left.length && r < right.length) {
                if (comparator(left[l], right[r]) >= 0) {
                    arr[a++] = right[r++];
                } else {
                    arr[a++] = left[l++];
                }
            }
            while(l < left.length) {
                arr[a++] = left[l++];
            }
            while(r < right.length) {
                arr[a++] = right[r++];
            }
        }
    }
}

function quickSort(arr, comparator = (a, b) => a - b) {
    if (arr.length === 0) {
        return [];
    }
    const left = [],
        right = [],
        pivot = arr[arr.length - 1];
    for(let i = 0; i < arr.length - 1; i++) {
        if (comparator(pivot, arr[i]) >= 0) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
}


function swap(arr, x, y) {
    const temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
}