#JSTheDefinitiveGuideDemo

这是重新实现《JS权威教程》第6版的示例代码，仅供个人学习

#翻译 file:///C:/Program%20Files/Git/mingw64/share/doc/git-doc/git-push.html git push的说明文档
##NAME 名称 
git-push - Update remote refs along with associated objects
git-push - 更新远程文件及相关参数。
##SYNOPSIS 纲要
git push [--all | --mirror | --tags] [--follow-tags] [--atomic] [-n | --dry-run] [--receive-pack=<git-receive-pack>]
	   [--repo=<repository>] [-f | --force] [--prune] [-v | --verbose]
	   [-u | --set-upstream] [--signed]
	   [--force-with-lease[=<refname>[:<expect>]]]
	   [--no-verify] [<repository> [<refspec>…​]]
##DESCRIPTION 描述
Updates remote refs using local refs, while sending objects necessary to complete the given refs.
使用本地文件，并发送必要的参数，更新远程文件。
You can make interesting things happen to a repository every time you push into it, by setting up hooks there. See documentation for linkgit:git-receive-pack[1].
你可以通过给某个仓库设置钩子，使其每次都能发生改变。具体请见“linkgit:git-receive-pack[1]”文档。
When the command line does not specify where to push with the <repository> argument, branch.*.remote configuration for the current branch is consulted to determine where to push. If the configuration is missing, it defaults to origin.
当命令行的指令没有通过<repository>参数指定将代码推送到哪个仓库，将根据“branch.*.remote”配置决定推送的目的。如果“branch.*.remote”配置没有，那么将默认推送到“origin”。
When the command line does not specify what to push with <refspec>... arguments or --all, --mirror, --tags options, the command finds the default <refspec> by consulting remote.*.push configuration, and if it is not found, honors push.default configuration to decide what to push (See linkgit:git-config[1] for the meaning of push.default).
当命令行的指令没有通过<refspec>...参数或“--all”、“--mirror”、“--tags”可选项指定推送内容，指令将根据“remote.*.push”配置确定默认的<refspec>参数。如果没有“remote.*.push”配置，将使用“push.default”配置决定推送内容（“push.default”参见“linkgit:git-config[1]”文档）。
##OPTIONS 参数
###<repository>
The "remote" repository that is destination of a push operation. This parameter can be either a URL (see the section GIT URLS below) or the name of a remote (see the section REMOTES below).

#git学习
## http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137628548491051ccfaef0ccb470894c858999603fedf000


