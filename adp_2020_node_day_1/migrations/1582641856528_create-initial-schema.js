/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('cats', {
        id: 'id',
        name: {type: 'text', notNull: true},
        color: {type: 'text', notNull: true}
    })

    pgm.createTable('users', {
        id: 'id',
        name: {type: 'text', notNull: true, unique: true},
        password: {type: 'text', notNull: true},
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        },
    })
};

exports.down = pgm => {
    throw new Error('Irrerversable migration')
};
