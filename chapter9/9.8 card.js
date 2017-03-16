/**
 * 使用枚举类型表示一副扑克牌
 */


function Card(suit, rank) {
    this.suit = suit;
    this.rank = rank;
}

Card.Suit = enumeration({Clubs:1, Diamonds:2, Hearts: 3, Spades: 4});
Card.Rank = enumeration({Two:2, Three:3, Four:4, Five:5, Six:6, Seven:7, Eight:8, Nine:9, Ten:10, Jack:11, Queen:12, King:13, Ace:14});
Card.prototype.toString = function() {
    return this.rank.toString() + ' of ' + this.suit.toString();
};
Card.prototype.compareTo = function(that) {
    if(this.rank < that.rank) return -1;
    if(this.rank > that.rank) return 1;
    return 0;
};
/**
 * 以扑克牌的玩法规则排序
 * @param a
 * @param b
 */
Card.orderByRank = function(a, b) {
    return a.compareTo(b);
};
/**
 * 以桥牌的玩法规则排序
 * @param a
 * @param b
 * @returns {*}
 */
Card.orderBySuit = function(a, b) {
    if(a.suit < b.suit) return -1;
    if(a.suit > b.suit) return 1;
    return Card.orderByRank(a, b);
};

/**
 * 定义用来表示一副扑克牌的类
 * @constructor
 */
function Deck() {
    var cards = this.cards = [];
    Card.Suit.foreach(function(s) {
        Card.Rank.foreach(function(r) {
            cards.push(new Card(s, r));
        });
    });
}

/**
 * 洗牌
 */
Deck.prototype.shuffle = function() {
    var deck = this.cards, len = deck.length;
    for(var i = len - 1; i > 0; i--) {
        var r = Math.floor(Math.random() * (i+1)), temp; // 随机数
        temp = deck[i], deck[i] = deck[r], deck[r] = temp; // 交换
    }
    return this;
};

/**
 * 发牌
 * @param n
 * @returns {Array.<T>}
 */
Deck.prototype.deal = function(n) {
    if(this.cards.length < n) throw 'Out of cards';
    return this.cards.splice(this.cards.length - n, n);
};