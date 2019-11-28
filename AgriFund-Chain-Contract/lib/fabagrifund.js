/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabAgriFund extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const farmer_issues = [
            {
                farmer_name: 'nivali',
                issue: 'borewell',
                issue_created_date: '11-12-2019',
                description: 'borewell description',
                requested_amount: 500,
                raised_amount: 200,
                problem_faced: 'irrigation problem',
                solution_proposed: 'needed funds for borewell',
                status: 'open',
                donators:[
                    {
                        donator_name: 'ramya',
                        donated_amount: 100,
                        donated_date: '11-14-2019'
                    },
                    {
                        donator_name: 'ramya',
                        donated_amount: 100,
                        donated_date: '11-15-2019'
                    }
                ]
            },
            {
                farmer_name: 'nivali',
                issue: 'fertilizers',
                issue_created_date: '11-12-2019',
                description: 'fertilizers description',
                requested_amount: 1000,
                raised_amount: 200,
                problem_faced: 'fertilizers',
                solution_proposed: 'needed funds for fertilizers',
                status: 'open',
                donators:[
                    {
                        donator_name: 'ramya',
                        donated_amount: 100,
                        donated_date: '11-13-2019'
                    },
                    {
                        donator_name: 'ramya',
                        donated_amount: 100,
                        donated_date: '11-14-2019'
                    }
                ]
            }
        ];

        for (let i = 0; i < farmer_issues.length; i++) {
            farmer_issues[i].docType = 'farmer_issue';
            await ctx.stub.putState('ISSUE' + i, Buffer.from(JSON.stringify(farmer_issues[i])));
            console.info('Added <--> ', farmer_issues[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryIssueID(ctx, issueID) {
        const issueAsBytes = await ctx.stub.getState(issueID); // get the car from chaincode state
        if (!issueAsBytes || issueAsBytes.length === 0) {
            throw new Error(`${issueID} does not exist`);
        }
        console.log(issueAsBytes.toString());
        return issueAsBytes.toString();
    }

    async createFarmerIssue(ctx, issueID, farmer_name, issue, issue_created_date, description, requested_amount, raised_amount, problem_faced, solution_proposed, status) {
        console.info('============= START : Create Issue ===========');

        const farmer_issue = {
            farmer_name,
            docType: 'farmer_issue',
            issue,
            issue_created_date,
            description,
            requested_amount:parseInt(requested_amount),
            raised_amount:parseInt(raised_amount),
            problem_faced,
            solution_proposed,
            status,
            donators:[]
        };

        await ctx.stub.putState(issueID, Buffer.from(JSON.stringify(farmer_issue)));
        console.info('============= END : Create Issue ===========');
    }

    async queryAllFarmerIssues(ctx) {
        const startKey = 'ISSUE0';
        const endKey = 'ISSUE999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async querySingleFarmerIssue(ctx, key) {
        console.log('Key is ' + key);
        const res = await ctx.stub.getState(key);
        if (res){
            console.log('Result is\n' + JSON.parse(res.toString()));
            let Record;
            try {
                Record = JSON.parse(res.toString('utf8'));
            } catch (err) {
                console.log(err);
                Record = res.toString('utf8');
            }
            return JSON.stringify([{ key, Record }]);
        }
        else{
            console.err('Did not find the issue with issueNo ' + key);
            return [];
        }
    }

    async addDonationToAnIssue(ctx, issueID, donator_name, donated_amount, donated_date) {
        console.info('============= START : addDonationToAnIssue ===========');

        const issueAsBytes = await ctx.stub.getState(issueID); // get the farmer_issue from chaincode state
        if (!issueAsBytes || issueAsBytes.length === 0) {
            throw new Error(`${issueID} does not exist`);
        }
        const farmer_issue = JSON.parse(issueAsBytes.toString());

        farmer_issue.raised_amount = parseInt(farmer_issue.raised_amount) + parseInt(donated_amount);
        const donor = {
            donator_name: donator_name,
            donated_amount: parseInt(donated_amount),
            donated_date: donated_date
        }
        farmer_issue.donators.push(donor);

        await ctx.stub.putState(issueID, Buffer.from(JSON.stringify(farmer_issue)));
        console.info('============= END : addDonationToAnIssue ===========');
    }

    async closeAnIssue(ctx, issueID, status) {
        console.info('============= START : closeAnIssue ===========');

        const issueAsBytes = await ctx.stub.getState(issueID); // get the farmer_issue from chaincode state
        if (!issueAsBytes || issueAsBytes.length === 0) {
            throw new Error(`${issueID} does not exist`);
        }
        const farmer_issue = JSON.parse(issueAsBytes.toString());

        farmer_issue.status = status;
       
        await ctx.stub.putState(issueID, Buffer.from(JSON.stringify(farmer_issue)));
        console.info('============= END : closeAnIssue ===========');
    }

    async updateAnIssue(ctx, issueID, description, requested_amount, problem_faced, solution_proposed) {
        console.info('============= START : updateAnIssue ===========');

        const issueAsBytes = await ctx.stub.getState(issueID); // get the farmer_issue from chaincode state
        if (!issueAsBytes || issueAsBytes.length === 0) {
            throw new Error(`${issueID} does not exist`);
        }
        const farmer_issue = JSON.parse(issueAsBytes.toString());

        farmer_issue.description = description;
        farmer_issue.requested_amount = parseInt(requested_amount);
        farmer_issue.problem_faced = problem_faced;
        farmer_issue.solution_proposed = solution_proposed;

        await ctx.stub.putState(issueID, Buffer.from(JSON.stringify(farmer_issue)));
        console.info('============= END : updateAnIssue ===========');
    }

}

module.exports = FabAgriFund;
