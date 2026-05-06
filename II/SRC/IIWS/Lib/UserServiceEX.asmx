<?xml version="1.0" encoding="utf-8" ?> 
<wsdl:definitions xmlns:s="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://schemas.xmlsoap.org/wsdl/soap12/" xmlns:mime="http://schemas.xmlsoap.org/wsdl/mime/" xmlns:tns="http://microsoft.com/taiwan/mcs" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/" xmlns:http="http://schemas.xmlsoap.org/wsdl/http/" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" targetNamespace="http://microsoft.com/taiwan/mcs" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:types>
<s:schema elementFormDefault="qualified" targetNamespace="http://microsoft.com/taiwan/mcs">
<s:element name="SetUserTitle">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="idSearchBase" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="value" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="SetUserTitleResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="SetUserTitleResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:complexType name="Status">
<s:sequence>
<s:element minOccurs="1" maxOccurs="1" name="StatusCode" type="s:int" /> 
<s:element minOccurs="0" maxOccurs="1" name="Severity" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="Desciption" type="s:string" /> 
</s:sequence>
</s:complexType>
<s:element name="SetUserDepartment">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="idSearchBase" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="value" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="SetUserDepartmentResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="SetUserDepartmentResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="SetUserDisplayName">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="idSearchBase" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="value" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="SetUserDisplayNameResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="SetUserDisplayNameResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="SetManagedBy">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="idSearchBase" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="objectType" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="managerId" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="managerIdSearchBase" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="SetManagedByResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="SetManagedByResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="GetManagedBy">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="idSearchBase" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="objectType" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="GetManagedByResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="GetManagedByResult" type="tns:ResponseDocumentEx" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:complexType name="ResponseDocumentEx">
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="Status" type="tns:Status" /> 
<s:element minOccurs="0" maxOccurs="1" name="Users" type="tns:ArrayOfUserInfoEx" /> 
</s:sequence>
</s:complexType>
<s:complexType name="ArrayOfUserInfoEx">
<s:sequence>
<s:element minOccurs="0" maxOccurs="unbounded" name="UserInfoEx" nillable="true" type="tns:UserInfoEx" /> 
</s:sequence>
</s:complexType>
<s:complexType name="UserInfoEx">
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="Id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="DistinguishedName" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="DirectoryProperties" type="tns:ArrayOfProperty" /> 
</s:sequence>
</s:complexType>
<s:complexType name="ArrayOfProperty">
<s:sequence>
<s:element minOccurs="0" maxOccurs="unbounded" name="Property" nillable="true" type="tns:Property" /> 
</s:sequence>
</s:complexType>
<s:complexType name="Property">
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="PropertyName" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="SingleValue" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="PropertyValues" type="tns:ArrayOfString" /> 
</s:sequence>
</s:complexType>
<s:complexType name="ArrayOfString">
<s:sequence>
<s:element minOccurs="0" maxOccurs="unbounded" name="value" nillable="true" type="s:string" /> 
</s:sequence>
</s:complexType>
<s:element name="CreateComputer">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="containerDN" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="description" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="managedByDN" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="joinDomainUserList" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="CreateComputerResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="CreateComputerResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="ResetComputer">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="containerDN" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="description" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="managedByDN" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="joinDomainUserList" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="ResetComputerResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="ResetComputerResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="DeleteComputer">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="containerDN" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="DeleteComputerResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="DeleteComputerResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="QueryComputer">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="containerDN" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="QueryComputerResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="QueryComputerResult" type="tns:ComputerResponseDocument" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:complexType name="ComputerResponseDocument">
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="Status" type="tns:Status" /> 
<s:element minOccurs="0" maxOccurs="1" name="Computers" type="tns:ArrayOfComputerInfoEx" /> 
</s:sequence>
</s:complexType>
<s:complexType name="ArrayOfComputerInfoEx">
<s:sequence>
<s:element minOccurs="0" maxOccurs="unbounded" name="ComputerInfoEx" nillable="true" type="tns:ComputerInfoEx" /> 
</s:sequence>
</s:complexType>
<s:complexType name="ComputerInfoEx">
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="Id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="DistinguishedName" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="Description" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="ManagedBy" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="DirectoryProperties" type="tns:ArrayOfProperty" /> 
</s:sequence>
</s:complexType>
<s:element name="IdInquiry">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="idSearchBase" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="IdInquiryResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="IdInquiryResult" type="tns:ResponseDocument" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:complexType name="ResponseDocument">
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="Status" type="tns:Status" /> 
<s:element minOccurs="0" maxOccurs="1" name="Users" type="tns:ArrayOfUserInfo" /> 
</s:sequence>
</s:complexType>
<s:complexType name="ArrayOfUserInfo">
<s:sequence>
<s:element minOccurs="0" maxOccurs="unbounded" name="UserInfo" nillable="true" type="tns:UserInfo" /> 
</s:sequence>
</s:complexType>
<s:complexType name="UserInfo">
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="Id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="DistinguishedName" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="DisplayName" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="Title" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="Department" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="MemberOf" type="tns:ArrayOfString1" /> 
</s:sequence>
</s:complexType>
<s:complexType name="ArrayOfString1">
<s:sequence>
<s:element minOccurs="0" maxOccurs="unbounded" name="cn" nillable="true" type="s:string" /> 
</s:sequence>
</s:complexType>
<s:element name="IdInquiryEx">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="idSearchBase" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="IdInquiryExResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="IdInquiryExResult" type="tns:ResponseDocumentEx" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="AggregateInquiryEx">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="department" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="groupName" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="idSearchBase" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="groupSearchBase" type="s:string" /> 
<s:element minOccurs="1" maxOccurs="1" name="EnableFlag" type="s:int" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="AggregateInquiryExResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="AggregateInquiryExResult" type="tns:ResponseDocumentEx" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="AddMemberEx">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="idSearchBase" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="groupName" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="groupSearchBase" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="AddMemberExResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="AddMemberExResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="RemoveMemberEx">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="idSearchBase" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="groupName" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="groupSearchBase" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="RemoveMemberExResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="RemoveMemberExResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="UnlockUser">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="idSearchBase" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="UnlockUserResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="UnlockUserResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="CreateMailbox">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="employeeID" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="idSearchBase" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="email" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="CreateMailboxResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="CreateMailboxResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="CreateMailboxEx">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="idSearchBase" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="email" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="mdb" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="CreateMailboxExResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="CreateMailboxExResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="DeleteMailboxEx">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="idSearchBase" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="DeleteMailboxExResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="DeleteMailboxExResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="SetProperties">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="idSearchBase" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="propertyNames" type="tns:ArrayOfString2" /> 
<s:element minOccurs="0" maxOccurs="1" name="propertyValues" type="tns:ArrayOfString2" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:complexType name="ArrayOfString2">
<s:sequence>
<s:element minOccurs="0" maxOccurs="unbounded" name="string" nillable="true" type="s:string" /> 
</s:sequence>
</s:complexType>
<s:element name="SetPropertiesResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="SetPropertiesResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="IdVerify">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="password" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="IdVerifyResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="IdVerifyResult" type="tns:ResponseDocument" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="AggregateInquiry">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="department" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="groupName" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="AggregateInquiryResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="AggregateInquiryResult" type="tns:ResponseDocument" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="AddMember">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="groupName" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="AddMemberResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="1" maxOccurs="1" name="AddMemberResult" type="s:boolean" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="RemoveMember">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="groupName" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="RemoveMemberResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="1" maxOccurs="1" name="RemoveMemberResult" type="s:boolean" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="ChangePassword">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="oldPassword" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="newPassword" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="ChangePasswordResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="ChangePasswordResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="ChangePasswordEx">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="oldPassword" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="newPassword" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="searchBase" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="ChangePasswordExResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="ChangePasswordExResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="ResetPassword">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="newPassword" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="ResetPasswordResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="ResetPasswordResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="ResetPasswordEx">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="newPassword" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="searchBase" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="ResetPasswordExResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="ResetPasswordExResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="DisableUser">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="DisableUserResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="DisableUserResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="DisableUserEx">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="searchBase" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="DisableUserExResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="DisableUserExResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="EnableUser">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="EnableUserResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="EnableUserResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="EnableUserEx">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="searchBase" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="EnableUserExResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="EnableUserExResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="CreateNewUser">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="employeeID" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="givenName" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="password" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="CreateNewUserResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="CreateNewUserResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="MoveUser">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="id" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="sourceDirectoryPath" type="s:string" /> 
<s:element minOccurs="0" maxOccurs="1" name="targetDirectoryPath" type="s:string" /> 
</s:sequence>
</s:complexType>
</s:element>
<s:element name="MoveUserResponse">
<s:complexType>
<s:sequence>
<s:element minOccurs="0" maxOccurs="1" name="MoveUserResult" type="tns:Status" /> 
</s:sequence>
</s:complexType>
</s:element>
</s:schema>
</wsdl:types>
<wsdl:message name="SetUserTitleSoapIn">
<wsdl:part name="parameters" element="tns:SetUserTitle" /> 
</wsdl:message>
<wsdl:message name="SetUserTitleSoapOut">
<wsdl:part name="parameters" element="tns:SetUserTitleResponse" /> 
</wsdl:message>
<wsdl:message name="SetUserDepartmentSoapIn">
<wsdl:part name="parameters" element="tns:SetUserDepartment" /> 
</wsdl:message>
<wsdl:message name="SetUserDepartmentSoapOut">
<wsdl:part name="parameters" element="tns:SetUserDepartmentResponse" /> 
</wsdl:message>
<wsdl:message name="SetUserDisplayNameSoapIn">
<wsdl:part name="parameters" element="tns:SetUserDisplayName" /> 
</wsdl:message>
<wsdl:message name="SetUserDisplayNameSoapOut">
<wsdl:part name="parameters" element="tns:SetUserDisplayNameResponse" /> 
</wsdl:message>
<wsdl:message name="SetManagedBySoapIn">
<wsdl:part name="parameters" element="tns:SetManagedBy" /> 
</wsdl:message>
<wsdl:message name="SetManagedBySoapOut">
<wsdl:part name="parameters" element="tns:SetManagedByResponse" /> 
</wsdl:message>
<wsdl:message name="GetManagedBySoapIn">
<wsdl:part name="parameters" element="tns:GetManagedBy" /> 
</wsdl:message>
<wsdl:message name="GetManagedBySoapOut">
<wsdl:part name="parameters" element="tns:GetManagedByResponse" /> 
</wsdl:message>
<wsdl:message name="CreateComputerSoapIn">
<wsdl:part name="parameters" element="tns:CreateComputer" /> 
</wsdl:message>
<wsdl:message name="CreateComputerSoapOut">
<wsdl:part name="parameters" element="tns:CreateComputerResponse" /> 
</wsdl:message>
<wsdl:message name="ResetComputerSoapIn">
<wsdl:part name="parameters" element="tns:ResetComputer" /> 
</wsdl:message>
<wsdl:message name="ResetComputerSoapOut">
<wsdl:part name="parameters" element="tns:ResetComputerResponse" /> 
</wsdl:message>
<wsdl:message name="DeleteComputerSoapIn">
<wsdl:part name="parameters" element="tns:DeleteComputer" /> 
</wsdl:message>
<wsdl:message name="DeleteComputerSoapOut">
<wsdl:part name="parameters" element="tns:DeleteComputerResponse" /> 
</wsdl:message>
<wsdl:message name="QueryComputerSoapIn">
<wsdl:part name="parameters" element="tns:QueryComputer" /> 
</wsdl:message>
<wsdl:message name="QueryComputerSoapOut">
<wsdl:part name="parameters" element="tns:QueryComputerResponse" /> 
</wsdl:message>
<wsdl:message name="IdInquirySoapIn">
<wsdl:part name="parameters" element="tns:IdInquiry" /> 
</wsdl:message>
<wsdl:message name="IdInquirySoapOut">
<wsdl:part name="parameters" element="tns:IdInquiryResponse" /> 
</wsdl:message>
<wsdl:message name="IdInquiryExSoapIn">
<wsdl:part name="parameters" element="tns:IdInquiryEx" /> 
</wsdl:message>
<wsdl:message name="IdInquiryExSoapOut">
<wsdl:part name="parameters" element="tns:IdInquiryExResponse" /> 
</wsdl:message>
<wsdl:message name="AggregateInquiryExSoapIn">
<wsdl:part name="parameters" element="tns:AggregateInquiryEx" /> 
</wsdl:message>
<wsdl:message name="AggregateInquiryExSoapOut">
<wsdl:part name="parameters" element="tns:AggregateInquiryExResponse" /> 
</wsdl:message>
<wsdl:message name="AddMemberExSoapIn">
<wsdl:part name="parameters" element="tns:AddMemberEx" /> 
</wsdl:message>
<wsdl:message name="AddMemberExSoapOut">
<wsdl:part name="parameters" element="tns:AddMemberExResponse" /> 
</wsdl:message>
<wsdl:message name="RemoveMemberExSoapIn">
<wsdl:part name="parameters" element="tns:RemoveMemberEx" /> 
</wsdl:message>
<wsdl:message name="RemoveMemberExSoapOut">
<wsdl:part name="parameters" element="tns:RemoveMemberExResponse" /> 
</wsdl:message>
<wsdl:message name="UnlockUserSoapIn">
<wsdl:part name="parameters" element="tns:UnlockUser" /> 
</wsdl:message>
<wsdl:message name="UnlockUserSoapOut">
<wsdl:part name="parameters" element="tns:UnlockUserResponse" /> 
</wsdl:message>
<wsdl:message name="CreateMailboxSoapIn">
<wsdl:part name="parameters" element="tns:CreateMailbox" /> 
</wsdl:message>
<wsdl:message name="CreateMailboxSoapOut">
<wsdl:part name="parameters" element="tns:CreateMailboxResponse" /> 
</wsdl:message>
<wsdl:message name="CreateMailboxExSoapIn">
<wsdl:part name="parameters" element="tns:CreateMailboxEx" /> 
</wsdl:message>
<wsdl:message name="CreateMailboxExSoapOut">
<wsdl:part name="parameters" element="tns:CreateMailboxExResponse" /> 
</wsdl:message>
<wsdl:message name="DeleteMailboxExSoapIn">
<wsdl:part name="parameters" element="tns:DeleteMailboxEx" /> 
</wsdl:message>
<wsdl:message name="DeleteMailboxExSoapOut">
<wsdl:part name="parameters" element="tns:DeleteMailboxExResponse" /> 
</wsdl:message>
<wsdl:message name="SetPropertiesSoapIn">
<wsdl:part name="parameters" element="tns:SetProperties" /> 
</wsdl:message>
<wsdl:message name="SetPropertiesSoapOut">
<wsdl:part name="parameters" element="tns:SetPropertiesResponse" /> 
</wsdl:message>
<wsdl:message name="IdVerifySoapIn">
<wsdl:part name="parameters" element="tns:IdVerify" /> 
</wsdl:message>
<wsdl:message name="IdVerifySoapOut">
<wsdl:part name="parameters" element="tns:IdVerifyResponse" /> 
</wsdl:message>
<wsdl:message name="AggregateInquirySoapIn">
<wsdl:part name="parameters" element="tns:AggregateInquiry" /> 
</wsdl:message>
<wsdl:message name="AggregateInquirySoapOut">
<wsdl:part name="parameters" element="tns:AggregateInquiryResponse" /> 
</wsdl:message>
<wsdl:message name="AddMemberSoapIn">
<wsdl:part name="parameters" element="tns:AddMember" /> 
</wsdl:message>
<wsdl:message name="AddMemberSoapOut">
<wsdl:part name="parameters" element="tns:AddMemberResponse" /> 
</wsdl:message>
<wsdl:message name="RemoveMemberSoapIn">
<wsdl:part name="parameters" element="tns:RemoveMember" /> 
</wsdl:message>
<wsdl:message name="RemoveMemberSoapOut">
<wsdl:part name="parameters" element="tns:RemoveMemberResponse" /> 
</wsdl:message>
<wsdl:message name="ChangePasswordSoapIn">
<wsdl:part name="parameters" element="tns:ChangePassword" /> 
</wsdl:message>
<wsdl:message name="ChangePasswordSoapOut">
<wsdl:part name="parameters" element="tns:ChangePasswordResponse" /> 
</wsdl:message>
<wsdl:message name="ChangePasswordExSoapIn">
<wsdl:part name="parameters" element="tns:ChangePasswordEx" /> 
</wsdl:message>
<wsdl:message name="ChangePasswordExSoapOut">
<wsdl:part name="parameters" element="tns:ChangePasswordExResponse" /> 
</wsdl:message>
<wsdl:message name="ResetPasswordSoapIn">
<wsdl:part name="parameters" element="tns:ResetPassword" /> 
</wsdl:message>
<wsdl:message name="ResetPasswordSoapOut">
<wsdl:part name="parameters" element="tns:ResetPasswordResponse" /> 
</wsdl:message>
<wsdl:message name="ResetPasswordExSoapIn">
<wsdl:part name="parameters" element="tns:ResetPasswordEx" /> 
</wsdl:message>
<wsdl:message name="ResetPasswordExSoapOut">
<wsdl:part name="parameters" element="tns:ResetPasswordExResponse" /> 
</wsdl:message>
<wsdl:message name="DisableUserSoapIn">
<wsdl:part name="parameters" element="tns:DisableUser" /> 
</wsdl:message>
<wsdl:message name="DisableUserSoapOut">
<wsdl:part name="parameters" element="tns:DisableUserResponse" /> 
</wsdl:message>
<wsdl:message name="DisableUserExSoapIn">
<wsdl:part name="parameters" element="tns:DisableUserEx" /> 
</wsdl:message>
<wsdl:message name="DisableUserExSoapOut">
<wsdl:part name="parameters" element="tns:DisableUserExResponse" /> 
</wsdl:message>
<wsdl:message name="EnableUserSoapIn">
<wsdl:part name="parameters" element="tns:EnableUser" /> 
</wsdl:message>
<wsdl:message name="EnableUserSoapOut">
<wsdl:part name="parameters" element="tns:EnableUserResponse" /> 
</wsdl:message>
<wsdl:message name="EnableUserExSoapIn">
<wsdl:part name="parameters" element="tns:EnableUserEx" /> 
</wsdl:message>
<wsdl:message name="EnableUserExSoapOut">
<wsdl:part name="parameters" element="tns:EnableUserExResponse" /> 
</wsdl:message>
<wsdl:message name="CreateNewUserSoapIn">
<wsdl:part name="parameters" element="tns:CreateNewUser" /> 
</wsdl:message>
<wsdl:message name="CreateNewUserSoapOut">
<wsdl:part name="parameters" element="tns:CreateNewUserResponse" /> 
</wsdl:message>
<wsdl:message name="MoveUserSoapIn">
<wsdl:part name="parameters" element="tns:MoveUser" /> 
</wsdl:message>
<wsdl:message name="MoveUserSoapOut">
<wsdl:part name="parameters" element="tns:MoveUserResponse" /> 
</wsdl:message>
<wsdl:portType name="UserServiceExSoap">
<wsdl:operation name="SetUserTitle">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:SetUserTitleSoapIn" /> 
<wsdl:output message="tns:SetUserTitleSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="SetUserDepartment">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:SetUserDepartmentSoapIn" /> 
<wsdl:output message="tns:SetUserDepartmentSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="SetUserDisplayName">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:SetUserDisplayNameSoapIn" /> 
<wsdl:output message="tns:SetUserDisplayNameSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="SetManagedBy">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:SetManagedBySoapIn" /> 
<wsdl:output message="tns:SetManagedBySoapOut" /> 
</wsdl:operation>
<wsdl:operation name="GetManagedBy">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:GetManagedBySoapIn" /> 
<wsdl:output message="tns:GetManagedBySoapOut" /> 
</wsdl:operation>
<wsdl:operation name="CreateComputer">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:CreateComputerSoapIn" /> 
<wsdl:output message="tns:CreateComputerSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="ResetComputer">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:ResetComputerSoapIn" /> 
<wsdl:output message="tns:ResetComputerSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="DeleteComputer">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:DeleteComputerSoapIn" /> 
<wsdl:output message="tns:DeleteComputerSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="QueryComputer">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:QueryComputerSoapIn" /> 
<wsdl:output message="tns:QueryComputerSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="IdInquiry">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:IdInquirySoapIn" /> 
<wsdl:output message="tns:IdInquirySoapOut" /> 
</wsdl:operation>
<wsdl:operation name="IdInquiryEx">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:IdInquiryExSoapIn" /> 
<wsdl:output message="tns:IdInquiryExSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="AggregateInquiryEx">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:AggregateInquiryExSoapIn" /> 
<wsdl:output message="tns:AggregateInquiryExSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="AddMemberEx">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:AddMemberExSoapIn" /> 
<wsdl:output message="tns:AddMemberExSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="RemoveMemberEx">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:RemoveMemberExSoapIn" /> 
<wsdl:output message="tns:RemoveMemberExSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="UnlockUser">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:UnlockUserSoapIn" /> 
<wsdl:output message="tns:UnlockUserSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="CreateMailbox">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:CreateMailboxSoapIn" /> 
<wsdl:output message="tns:CreateMailboxSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="CreateMailboxEx">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:CreateMailboxExSoapIn" /> 
<wsdl:output message="tns:CreateMailboxExSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="DeleteMailboxEx">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:DeleteMailboxExSoapIn" /> 
<wsdl:output message="tns:DeleteMailboxExSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="SetProperties">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:SetPropertiesSoapIn" /> 
<wsdl:output message="tns:SetPropertiesSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="IdVerify">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:IdVerifySoapIn" /> 
<wsdl:output message="tns:IdVerifySoapOut" /> 
</wsdl:operation>
<wsdl:operation name="AggregateInquiry">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:AggregateInquirySoapIn" /> 
<wsdl:output message="tns:AggregateInquirySoapOut" /> 
</wsdl:operation>
<wsdl:operation name="AddMember">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:AddMemberSoapIn" /> 
<wsdl:output message="tns:AddMemberSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="RemoveMember">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:RemoveMemberSoapIn" /> 
<wsdl:output message="tns:RemoveMemberSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="ChangePassword">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:ChangePasswordSoapIn" /> 
<wsdl:output message="tns:ChangePasswordSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="ChangePasswordEx">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:ChangePasswordExSoapIn" /> 
<wsdl:output message="tns:ChangePasswordExSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="ResetPassword">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:ResetPasswordSoapIn" /> 
<wsdl:output message="tns:ResetPasswordSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="ResetPasswordEx">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:ResetPasswordExSoapIn" /> 
<wsdl:output message="tns:ResetPasswordExSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="DisableUser">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:DisableUserSoapIn" /> 
<wsdl:output message="tns:DisableUserSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="DisableUserEx">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:DisableUserExSoapIn" /> 
<wsdl:output message="tns:DisableUserExSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="EnableUser">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:EnableUserSoapIn" /> 
<wsdl:output message="tns:EnableUserSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="EnableUserEx">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:EnableUserExSoapIn" /> 
<wsdl:output message="tns:EnableUserExSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="CreateNewUser">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:CreateNewUserSoapIn" /> 
<wsdl:output message="tns:CreateNewUserSoapOut" /> 
</wsdl:operation>
<wsdl:operation name="MoveUser">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:input message="tns:MoveUserSoapIn" /> 
<wsdl:output message="tns:MoveUserSoapOut" /> 
</wsdl:operation>
</wsdl:portType>
<wsdl:binding name="UserServiceExSoap" type="tns:UserServiceExSoap">
<soap:binding transport="http://schemas.xmlsoap.org/soap/http" /> 
<wsdl:operation name="SetUserTitle">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/SetUserTitle" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="SetUserDepartment">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/SetUserDepartment" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="SetUserDisplayName">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/SetUserDisplayName" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="SetManagedBy">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/SetManagedBy" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="GetManagedBy">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/GetManagedBy" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="CreateComputer">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/CreateComputer" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="ResetComputer">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/ResetComputer" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="DeleteComputer">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/DeleteComputer" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="QueryComputer">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/QueryComputer" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="IdInquiry">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/IdInquiry" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="IdInquiryEx">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/IdInquiryEx" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="AggregateInquiryEx">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/AggregateInquiryEx" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="AddMemberEx">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/AddMemberEx" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="RemoveMemberEx">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/RemoveMemberEx" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="UnlockUser">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/UnlockUser" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="CreateMailbox">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/CreateMailbox" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="CreateMailboxEx">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/CreateMailboxEx" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="DeleteMailboxEx">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/DeleteMailboxEx" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="SetProperties">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/SetProperties" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="IdVerify">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/IdVerify" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="AggregateInquiry">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/AggregateInquiry" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="AddMember">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/AddMember" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="RemoveMember">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/RemoveMember" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="ChangePassword">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/ChangePassword" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="ChangePasswordEx">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/ChangePasswordEx" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="ResetPassword">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/ResetPassword" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="ResetPasswordEx">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/ResetPasswordEx" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="DisableUser">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/DisableUser" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="DisableUserEx">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/DisableUserEx" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="EnableUser">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/EnableUser" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="EnableUserEx">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/EnableUserEx" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="CreateNewUser">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/CreateNewUser" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="MoveUser">
<soap:operation soapAction="http://microsoft.com/taiwan/mcs/MoveUser" style="document" /> 
<wsdl:input>
<soap:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
</wsdl:binding>
<wsdl:binding name="UserServiceExSoap12" type="tns:UserServiceExSoap">
<soap12:binding transport="http://schemas.xmlsoap.org/soap/http" /> 
<wsdl:operation name="SetUserTitle">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/SetUserTitle" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="SetUserDepartment">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/SetUserDepartment" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="SetUserDisplayName">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/SetUserDisplayName" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="SetManagedBy">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/SetManagedBy" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="GetManagedBy">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/GetManagedBy" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="CreateComputer">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/CreateComputer" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="ResetComputer">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/ResetComputer" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="DeleteComputer">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/DeleteComputer" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="QueryComputer">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/QueryComputer" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="IdInquiry">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/IdInquiry" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="IdInquiryEx">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/IdInquiryEx" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="AggregateInquiryEx">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/AggregateInquiryEx" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="AddMemberEx">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/AddMemberEx" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="RemoveMemberEx">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/RemoveMemberEx" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="UnlockUser">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/UnlockUser" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="CreateMailbox">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/CreateMailbox" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="CreateMailboxEx">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/CreateMailboxEx" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="DeleteMailboxEx">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/DeleteMailboxEx" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="SetProperties">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/SetProperties" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="IdVerify">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/IdVerify" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="AggregateInquiry">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/AggregateInquiry" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="AddMember">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/AddMember" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="RemoveMember">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/RemoveMember" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="ChangePassword">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/ChangePassword" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="ChangePasswordEx">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/ChangePasswordEx" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="ResetPassword">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/ResetPassword" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="ResetPasswordEx">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/ResetPasswordEx" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="DisableUser">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/DisableUser" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="DisableUserEx">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/DisableUserEx" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="EnableUser">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/EnableUser" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="EnableUserEx">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/EnableUserEx" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="CreateNewUser">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/CreateNewUser" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
<wsdl:operation name="MoveUser">
<soap12:operation soapAction="http://microsoft.com/taiwan/mcs/MoveUser" style="document" /> 
<wsdl:input>
<soap12:body use="literal" /> 
</wsdl:input>
<wsdl:output>
<soap12:body use="literal" /> 
</wsdl:output>
</wsdl:operation>
</wsdl:binding>
<wsdl:service name="UserServiceEx">
<wsdl:documentation xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"></wsdl:documentation> 
<wsdl:port name="UserServiceExSoap" binding="tns:UserServiceExSoap">
<soap:address location="https://adws.landbankt.com.tw/WebLdap/UserServiceEX.asmx" /> 
</wsdl:port>
<wsdl:port name="UserServiceExSoap12" binding="tns:UserServiceExSoap12">
<soap12:address location="https://adws.landbankt.com.tw/WebLdap/UserServiceEX.asmx" /> 
</wsdl:port>
</wsdl:service>
</wsdl:definitions>