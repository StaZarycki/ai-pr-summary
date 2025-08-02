import zod from 'zod';

const schema = zod.object({
    TEST: zod.string()
});

export function getConfig(): zod.infer<typeof schema> {
    return schema.parse(process.env);
}