#!/usr/bin/perl

use strict;
use warnings;

use JSON;
use Perl6::Slurp;
use WWW::Mechanize;
use Net::GitHub::Upload;
use Config::Pit;

my $config = pit_get('github-upload', require => {
    'login' => 'your login id on github.com',
    'password' => 'your password on github.com',
});

my $manifest = from_json(slurp 'manifest.json');
my $id = $manifest->{id};
my $version = $manifest->{version};

open my $fh, '>update.xml';
print $fh <<EOF;
<gupdate xmlns="http://www.google.com/update2/response" protocol="2.0">
    <app appid="$id">
        <updatecheck codebase="http://cloud.github.com/downloads/mattn/chrome-grff/chrome-grff.crx" version="$version" />
    </app> 
</gupdate> 
EOF
close $fh;

my $mech = WWW::Mechanize->new;
$mech->env_proxy;
$mech->get('https://github.com/login');
$mech->submit_form(
    form_number => 2,
    fields      => {
        login => $config->{login},
        password => $config->{password},
});

$mech->get('http://github.com/mattn/chrome-grff/downloads');
for my $form (@{$mech->forms}) {
    if ($form->action =~ /^http:\/\/github.com\/mattn\/chrome-grff\/downloads\//) {
        print "deleting ".$form->action."\n";
        $mech->request($form->click);
    }
}

chomp(my $user  = `git config github.user`);
chomp(my $token = `git config github.token`);
my $gh = Net::GitHub::Upload->new(
    login => $user,
    token => $token,
);
print "uploading chrome-grff.crx\n";
$gh->upload( repos => 'mattn/chrome-grff', file  => 'chrome-grff.crx' );
print "uploading update.xml\n";
$gh->upload( repos => 'mattn/chrome-grff', file  => 'update.xml' );
