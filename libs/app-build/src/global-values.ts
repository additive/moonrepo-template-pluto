import { UTCDateMini } from '@date-fns/utc'
import { formatISO } from 'date-fns'
import { nanoid } from 'nanoid'

import { getEnvironment, getHash, getVersion } from './utilities'

const globals: Record<string, string> = {
	BUILD_ENV: getEnvironment(),
	BUILD_DATE: formatISO(new UTCDateMini()),
	APP_VERSION: getVersion(),
	APP_HASH: getHash(),
	NONCE: btoa(nanoid()),
}

export default globals
