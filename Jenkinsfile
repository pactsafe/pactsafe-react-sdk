node {
    checkout scm

    ansiColor('xterm') {
        try {
            setBuildStatus("Build Pending", "PENDING");
            
            sh "npm install"

            stage('Test') {
                sh "npm test"
            }

            stage('Lint') {
                sh "npm run lint"
            }

            setBuildStatus("Build Succeeded", "SUCCESS");
        } catch (e) {
            setBuildStatus("Build failed", "FAILED");
            throw e
        }
    }
}

void setBuildStatus(String message, String state) {
  step([
      $class: "GitHubCommitStatusSetter",
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: "https://github.com/pactsafe/pactsafe-react-sdk"],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
    ]);
}