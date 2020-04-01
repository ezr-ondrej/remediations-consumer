import '../config';
import * as convict from 'convict';

const config = convict({
    env: {
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV'
    },
    namespace: {
        format: String,
        default: 'local',
        env: 'NAMESPACE'
    },
    commit: {
        format: String,
        default: undefined,
        env: 'OPENSHIFT_BUILD_COMMIT'
    },
    logging: {
        level: {
            format: String,
            default: 'trace',
            env: 'LOG_LEVEL'
        },
        pretty: {
            format: Boolean,
            default: false,
            env: 'LOG_PRETTY'
        }
    },

    db: {
        connection: {
            user: {
                format: String,
                default: 'postgres',
                env: 'DB_USERNAME'
            },
            password: {
                format: String,
                default: 'remediations',
                env: 'DB_PASSWORD',
                sensitive: true
            },
            database: {
                format: String,
                default: 'remediations_consumer_test',
                env: 'DB_DATABASE'
            },
            host: {
                format: String,
                default: '127.0.0.1',
                env: 'DB_HOST'
            },
            ssl: {
                ca: {
                    format: 'file',
                    default: undefined,
                    env: 'DB_CA',
                    sensitive: true
                }
            }
        },
        pool: {
            min: {
                format: 'nat',
                default: 2,
                env: 'DB_POOL_MIN'
            },
            max: {
                format: 'nat',
                default: 5,
                env: 'DB_POOL_MAX'
            }
        },
        ssl: {
            enabled: {
                format: Boolean,
                default: true,
                env: 'DB_SSL_ENABLED'
            }
        }
    },

    metrics: {
        prefix: {
            format: String,
            default: 'remediations_consumer_',
            env: 'METRICS_PREFIX'
        },
        pushGateway: {
            format: 'url',
            default: 'http://localhost:9091',
            env: 'METRICS_PUSH_GATEWAY'
        }
    },

    cleaner: {
        timeoutSystems: {
            format: 'nat',
            default: 3 * 60,
            env: 'CLEANER_TIMEOUT_SYSTEMS'
        },
        timeoutExecutors: {
            format: 'nat',
            default: 15,
            env: 'CLEANER_TIMEOUT_EXECUTORS'
        },
        timeoutRuns: {
            format: 'nat',
            default: 15,
            env: 'CLEANER_TIMEOUT_RUNS'
        }
    }
});

config.validate({ strict: true });

export default config.get();
export const sanitized = config.toString();
