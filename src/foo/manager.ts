// TODO foo business logic
import { FooRequest } from './schema'

const FooManager = {
    DoFoo: async (f: FooRequest): Promise<string> => {
        return 'Foo Done'
    }
}

export default FooManager
