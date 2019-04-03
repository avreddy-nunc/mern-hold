//var a = [[3,3,3,3,3,3],[3,1,2,3,1,3],[3,1,2,3,1,3],[3,3,3,1,3,3]];
//var a = [[3,3,3,3,5,3],[3,0,2,3,1,3],[3,1,2,3,1,3],[3,3,3,1,3,3]];
var FindStoredWater = function (arr) {
  var a = JSON.parse(JSON.stringify(arr));
  var wasted = [];
  var tested = [];
  var used = [];
  var storedCudes = [];
  var useful = 0;
  var row = a.length;
  var col = a[0].length;
  var maxHeight = 0;
  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      if (a[i][j] > maxHeight) {
        maxHeight = a[i][j];
      }
    }
  }
  //console.log(row, col);
  for (var k = 2; k <= maxHeight; k++) {
    //console.log('layer', k);
    used = [];
    for (i = 1; i < row - 1; i++) {
      for (j = 1; j < col - 1; j++) {
        if (a[i][j] < k) {
          tested = [];
          //console.log('testing', i, j);
          if (checkForLeakage(i, j)) {
            //console.log(i, j, 'wasted');
            wasted.push([i, j]);
          } else {
            if (isItemInArray(used, [i, j])) {
              a[i][j]++;
              //console.log(i, j, 'used', a[i][j]);
              used.push([i, j]);
              storedCudes.push([i,j]);
              useful++
            }
          }
        }
      }
    }
  }
  //console.log(useful);

  function checkForLeakage(x, y) {
    tested.push([x, y]);
    //console.log(x, y);
    if (a[x][y] === 0) {
      return true;
    } else if (x === 0 || x === row - 1 || y === 0 || y === col - 1) {
      return true;
    } else if (wasted.indexOf([x, y]) !== -1) {
      return true;
    } else if (checkAnyAdjacentLeakage(x, y)) {
      return true;
    }
    return false;
  }

  function checkAnyAdjacentLeakage(x, y) {
    var top = [x, y - 1];
    var left = [x - 1, y];
    var bottom = [x, y + 1];
    var right = [x + 1, y];
    var isTop = false;
    if (isItemInArray(tested, top) && a[x][y] >= a[x][y - 1]) {
      isTop = checkForLeakage(x, y - 1);
    }
    var isLeft = false;
    if (isItemInArray(tested, left) && a[x][y] >= a[x - 1][y]) {
      isLeft = checkForLeakage(x - 1, y)
    }
    var isBottom = false;
    if (isItemInArray(tested, bottom) && a[x][y] >= a[x][y + 1]) {
      isBottom = checkForLeakage(x, y + 1)
    }
    var isRight = false;
    if (isItemInArray(tested, right) && a[x][y] >= a[x + 1][y]) {
      isRight = checkForLeakage(x + 1, y)
    }
    return isTop || isLeft || isBottom || isRight;
  }

  function isItemInArray(array, item) {
    for (var i = 0; i < array.length; i++) {
      // This if statement depends on the format of your array
      if (array[i][0] === item[0] && array[i][1] === item[1]) {
        return false;   // Found it
      }
    }
    return true;   // Not found
  }
  console.log(used);
  return {"storedWater":useful,"usedCubes":storedCudes,"maxHeight":maxHeight}
};
export default FindStoredWater;