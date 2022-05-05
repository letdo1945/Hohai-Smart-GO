var e = require("./mock");

e.Mock.get("/getXSShenHeJiLu", function(e) {
    return {
        list: [ {
            id: "4d4d481545cd416c96dd52a7c46f204a",
            createTime: "2020-04-07 10:07:25",
            updateTime: "2020-04-07 10:07:25",
            startTime: "2020-06-07 00:00:01",
            endTime: "2020-07-07 23:59:59",
            applicantId: "4f5449a1864b49d2befff9aa58786a3d",
            applicantName: "丁瑞钢",
            applicantPhone: "18502554047",
            universityId: null,
            universityName: null,
            visitorReason: "111",
            verifierId: "1f633d87c5a34094b27f28618b6e633a",
            verifierTwoId: "193dc921b9434af08aceca75ce3d6959",
            verifierState: 11,
            type: 0,
            verifier: 10,
            unitManagerId: "1f633d87c5a34094b27f28618b6e633a",
            unitManagerName: "翟福雷",
            unitPartyCommittee: null,
            unitPartyCommitteeId: "193dc921b9434af08aceca75ce3d6959",
            unitPartyCommitteeName: "徐群",
            dictionaryInfo: [ {
                value: "1",
                label: "翟福雷已审核"
            } ],
            universityVisitorItem: [ {
                id: "686c0cd333374dc8b01b7ca6a7363bea",
                createTime: "2020-04-07 10:07:25",
                updateTime: "2020-04-07 10:07:25",
                universityVisitorId: "4d4d481545cd416c96dd52a7c46f204a",
                visitorName: "111",
                visitorCard: "111",
                visitorCardType: "1",
                state: 0,
                type: 0,
                visitorPhone: "111"
            } ]
        }, {
            id: "dfabacb003ff450390137e59853a26c2",
            createTime: "2020-04-01 10:31:07",
            updateTime: "2020-04-01 10:31:07",
            startTime: "2020-04-01 00:00:01",
            endTime: "2020-04-01 23:59:59",
            applicantId: "4f5449a1864b49d2befff9aa58786a3d",
            applicantName: "丁瑞钢",
            applicantPhone: "18502554047",
            universityId: null,
            universityName: null,
            visitorReason: "1111",
            verifierId: "4f5449a1864b49d2befff9aa58786a3d",
            verifierTwoId: "193dc921b9434af08aceca75ce3d6959",
            verifierState: 0,
            type: 0,
            verifier: 0,
            unitManagerId: "4f5449a1864b49d2befff9aa58786a3d",
            unitManagerName: "丁瑞钢",
            unitPartyCommittee: null,
            unitPartyCommitteeId: "193dc921b9434af08aceca75ce3d6959",
            unitPartyCommitteeName: "徐群",
            dictionaryInfo: [ {
                value: "1",
                label: "丁瑞钢审核已通过"
            } ],
            universityVisitorItem: [ {
                id: "2cd593a8c5034760990d18de40341ff1",
                createTime: "2020-04-01 10:31:07",
                updateTime: "2020-04-01 10:31:07",
                universityVisitorId: "dfabacb003ff450390137e59853a26c2",
                visitorName: "111",
                visitorCard: "123456789",
                visitorCardType: "1",
                state: 0,
                type: 0,
                visitorPhone: "1111"
            } ]
        }, {
            id: "1a80c50f31924f91ac36bc77afb5aca0",
            createTime: "2020-04-01 10:29:31",
            updateTime: "2020-04-01 10:29:31",
            startTime: "2020-05-01 00:00:01",
            endTime: "2020-05-01 23:59:59",
            applicantId: "4f5449a1864b49d2befff9aa58786a3d",
            applicantName: "丁瑞钢",
            applicantPhone: "18502554047",
            universityId: null,
            universityName: null,
            visitorReason: "11111",
            verifierId: "4f5449a1864b49d2befff9aa58786a3d",
            verifierTwoId: "193dc921b9434af08aceca75ce3d6959",
            verifierState: 0,
            type: 0,
            verifier: 0,
            unitManagerId: "4f5449a1864b49d2befff9aa58786a3d",
            unitManagerName: "丁瑞钢",
            unitPartyCommittee: null,
            unitPartyCommitteeId: "193dc921b9434af08aceca75ce3d6959",
            unitPartyCommitteeName: "徐群",
            dictionaryInfo: [ {
                value: "1",
                label: "丁瑞钢审核已通过"
            } ],
            universityVisitorItem: [ {
                id: "835ca2b2bca545d09c15a3b7f8a21c88",
                createTime: "2020-04-01 10:29:31",
                updateTime: "2020-04-01 10:29:31",
                universityVisitorId: "1a80c50f31924f91ac36bc77afb5aca0",
                visitorName: "111",
                visitorCard: "111111111",
                visitorCardType: "1",
                state: 0,
                type: 0,
                visitorPhone: "11111"
            } ]
        } ],
        total: 3
    };
}), e.Mock.get("/setToBlackList", function(e) {
    return {};
}), e.Mock.get("/setToWhiteList", function(e) {
    return {};
}), e.Mock.get("/getShenHeRenYuanList", function(e) {
    return {
        list: [ {
            id: 1,
            name: "测试",
            departmentsUnitName: "机构",
            createTime: "2018-12-26 08:30:23",
            submitUser: "测试2",
            type: 0
        }, {
            id: 2,
            name: "测试",
            departmentsUnitName: "机构",
            createTime: "2018-12-26 08:30:23",
            submitUser: "测试2",
            type: 1
        } ]
    };
});