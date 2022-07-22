#!/usr/bin/env node
// console.log(111)
const inquirer = require('inquirer');
const commander = require('commander');
const ora = require('ora');
    // inquirer.prompt([
    //     {
    //         type: 'input',
    //         name: 'name',
    //         message: 'what are you name?'
    //     },
    //     {
    //         type: 'confirm',
    //         name: 'confirm',
    //         message: 'what are you confirm?',
    //         default: false
    //     },
    //     {
    //         type: 'list',
    //         name: 'list',
    //         message: 'what are your select?',
    //         choices: ['red', 'blue', 'yellow'],
    //         default: 1
    //     }
    // ])
    // .then((answers) => {
    //     console.log(answers)
    //     // Use user feedback for... whatever!!
    // })
    commander.option('-a [num]', 'this is just test', (num)=>{
        console.log(num);
    })
    // 命令
    commander.command('create <projrctName>').action((projectName)=>{
        const spinner = ora('下载中')
        spinner.start()
        setTimeout(()=>{
            // commander.parse(process.cwd());
            console.log(projectName);
            spinner.stop()
        },3000)
    })

    commander.parse(process.argv);
