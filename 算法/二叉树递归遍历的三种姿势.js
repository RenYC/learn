/**
 * 先序遍历  根结点 -> 左子树 -> 右子树
 * 中序遍历  左子树 -> 根结点 -> 右子树
 * 后序遍历  左子树 -> 右子树 -> 根结点
 */
const root = {
  val: "A",
  left: {
    val: "B",
    left: {
      val: "D",
    },
    right: {
      val: "E",
    },
  },
  right: {
    val: "C",
    right: {
      val: "F",
    },
  },
};

// 先序
function fn(root) {
  if (!root) return;

  // 输出当前遍历的结点值
  console.log(root.val);
  // 递归遍历左子树
  fn(root.left);
  // 递归遍历右子树
  fn(root.right);
}
// 中序
function fn1(root) {
  if (!root) return;

  // 递归遍历左子树
  fn1(root.left);
  // 输出当前遍历的结点值
  console.log(root.val);
  // 递归遍历右子树
  fn1(root.right);
}
// 后序
function fn2(root) {
  if (!root) return;

  // 递归遍历左子树
  fn2(root.left);
  // 递归遍历右子树
  fn2(root.right);
  // 输出当前遍历的结点值
  console.log(root.val);
}

// fn2(root);
