/**
 * Created by Administrator on 2016/3/31.
 * ��p�еĿ�ö�����Ը��Ƶ�o��,������o
 * ���o��p��ͬ������,��ô����o�е�ͬ������
 * �ú���������getter��setter,�Լ����Եĸ���(���Ե�ֵ�Ƕ���ʱ,Ϊǳ����)
 * �ϼ�
 */
function extend(o, p) {
    for(var prop in p) {
        o[prop] = p[prop];
    }
    return o;
}

/**
 * ��p�еĿ�ö�����Ը��Ƶ�o��,������o
 * ���o��p��ͬ������,��ô������o�е�ͬ������
 * �ú���������getter��setter,�Լ����Եĸ���(���Ե�ֵ�Ƕ���ʱ,Ϊǳ����)
 * �ϼ�
 * */
function merge(o, p) {
    for(var prop in p) {
        if(o.hasOwnProperty(prop)) continue;
        o[prop] = p[prop];
    }
    return o;
}

/**
 * ���o�е�������p��û��ͬ������,��ɾ��������,������o
 * ����
 * */
function restrict(o, p) {
    for(var prop in p) {
        if(!(prop in o)) delete o[prop];
    }
    return o;
}

/**
 * ���o�д���p�е�ͬ������,��ɾ��֮,������o
 * �
 * */
function substract(o, p) {
    for(var prop in p) {
        delete o[prop];
    }
    return o;
}

/**
 * ����һ���¶���,�ö�����o��p�ĺϼ�,ͬ������ʹ��p�е�ֵ
 * �ϼ�
 * */
function union(o, p) {
    return extend(extend({}, o), p);
}

/**
 * ����һ���¶���,�ö���ӵ��o��p�Ĺ�ͬ����,����ֵʹ��o��
 * ����
 * */
function intersection(o, p) {
    return restrict(extend({}, o), p);
}

/**
 * ����һ������,����������o�п�ö�ٵ��������Ե�����
 * */
function keys(o) {
    if(typeof o !== 'object') throw TypeError();
    var result = [];
    for (var prop in o) {
        if(o.hasOwnProperty(prop)) {
            result.push(prop);
        }
    }
    return result;
}

