def _npm_install_impl(ctx):
    args = ctx.actions.args()
    args.add("install")

    inputs = depset(ctx.attr.package_json, ctx.attr.package_lock_json)
    output_directory = ctx.actions.declare_directory("node_modules")

    ctx.actions.run(
        executable = ctx.attr._npm,
        arguments = [args],
        inputs = inputs,
        outputs = [output_directory],
    )

    return [
        DefaultInfo(files = depset([output_directory])),
    ]

npm_install = rule(
    implementation = _npm_install_impl,
    attrs = {
        "package_json": attr.label(
            allow_single_file = True,
        ),
        "package_lock_json": attr.label(
            allow_single_file = True,
        ),
        "_npm": attr.label(
            default = Label("//node:npm_bin"),
            allow_single_file = True,
            executable = True,
            cfg = "exec",
        ),
    },
)