const assert = require('assert');

// 验证输出的错误：
try {
    // ==
    // assert.equal(1,'1')
    // ===
    // assert.strictEqual(1,'1');
    // 复杂类型数据 == 
    // assert.deepEqual([1,2,3,[4,5]],[1,2,3,[4,'5']])
    // 严格模式复杂类型数据
    assert.deepStrictEqual([1,2,3,[4,5]],[1,2,3,[4,'5']])
} catch (err) {
        console.log(err)
        console.log("上面出错了!")
        console.log('【',err.message,'】','【',err.operator,'】')
}