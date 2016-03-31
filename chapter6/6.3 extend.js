/**
 * Created by Administrator on 2016/3/31.
 * ��Object.prototype���һ������ö�ٵ�extend()����
 * ��������̳��Ե������Ķ���,����Ϊ��������Ķ��������һһ����
 * ����ֵ����,Ҳ�������Ե�����,������Ŀ������д���ͬ��������
 * ����������������ж���(��������ö�ٵ�����)Ҳ��һһ����
 */
Object.defineProperty(Object.prototype, 'extend', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function (o) {
        var props = Object.getOwnPropertyNames(o);

        for (var i = 0, len = props.length; i < len; i++) {
            if (props[i] in this) continue;
            var desc = Object.getOwnPropertyDescriptor(o, props[i]); // ��ȡ������
            Object.defineProperty(this, props[i], desc); // ��this����һ������
        }
    }
})
