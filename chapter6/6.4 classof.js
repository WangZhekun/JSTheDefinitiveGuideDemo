/**
 * Created by Administrator on 2016/4/1.
 * ���������������
 * ԭʼ��toString�������Եõ������������,[object class],��ȡ��8����������2���ַ����Ƕ����������
 */
function classof(p) {
    if(p === null) return 'Null';
    if(p === undefined) return 'Undefined';
    return Object.prototype.toString.call(p).slice(8, -1);
}
