module.exports = {
    meta: {
        messages: {
            capitalizedName: 'Class name should be capitalized.',
        },
    },
    create(context) {
        return {
            ClassDeclaration(node) {
                const char = node.id.name[0]
                if (char === char.toLowerCase()) {
                    context.report({ node: node.id, messageId: 'capitalizedName' })
                }
            }
        }
    }
}