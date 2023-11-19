module.exports = {
    apps: [{
        script: 'npm start'
    }],
    deploy: {
        production: {
            key: 'sierrabiolab-aws.pem',
            user: 'centos',
            host: '13.56.48.255',
            ref: 'origin/main',
            repo: 'git@github.com:ducluu92/CLEAR_APP.git',
            path: '/home/centos/app.getclrdv.com',
            'pre-deploy-local': '',
            'post-deploy': 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
            'pre-setup': '',
            'ssh_options': 'ForwardAgent=yes'
        }
    }
}